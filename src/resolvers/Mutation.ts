import { S3 } from 'aws-sdk';
import { compare, hash } from 'bcrypt';
import * as EmailValidator from 'email-validator';
import { Context } from 'graphql-yoga/dist/types';
import * as logger from 'heroku-logger';
import { sign, verify } from 'jsonwebtoken';
import { Editor, Range, Value } from 'slate';
import { MutationResolvers } from '../generated/graphqlgen';
import { getUserID, sendEmail } from '../utils';

const hashPassword = (password: string) => hash(password, 10);
const generateToken = (userID: string, options = {}) => sign({ userID }, process.env.APP_SECRET, options);

const randomFounder = () => ['Máté', 'Matesz', 'Ádám', 'Bence', 'Kristóf', 'Berci'][Math.floor(Math.random() * 6)];

const validateEmail = (email: string) => {
  if (!EmailValidator.validate(email)) {
    throw new Error(`Email not valid: ${email}`);
  }
};

const validatePassword = (password: string) => {
  if (password.length < 7) {
    throw new Error('A jelszónak 7 karakternél hosszabbnak kell lennie');
  }
};

const checkTokenValid = (token: string) => {
  try {
    verify(token, process.env.APP_SECRET);
    return true;
  } catch {
    return false;
  }
};

const resetPassword = async (token: string, password: string, context: Context) => {
  const entries = await context.prisma.passwordSetTokens({ where: { token } });
  if (entries.length > 0) {
    if (entries.length > 1) {
      logger.error('More than 1 password reset token in db!', { entries });
      throw new Error('Too many tokens in DB!');
    }
    checkTokenValid(token);
    const { email } = entries[0];
    const newPassword = await hashPassword(password);
    await context.prisma.deletePasswordSetToken({ token });
    await context.prisma.updateUser({ where: { email }, data: { password: newPassword } });
    return true;
  }
  return false;
};

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,

  signup: async (_, { email, password, role, neptun }, context) => {
    const user = await context.prisma.createUser({
      email,
      password: await hashPassword(password),
      neptun,
      role,
    });

    logger.info(`User signed up!`, { email, neptun, role });

    return {
      token: generateToken(user.id),
      user,
    };
  },

  login: async (_, { email, password }, context) => {
    const user = await context.prisma.user({ email });
    if (!user) {
      logger.error(`No such user exists!`, { user });
      throw new Error('A megadott e-mail cím vagy jelszó nem megfelelő.');
    }

    if (!user.isActive) {
      logger.error(`Inactive user tried to log in!`, { user });
      throw new Error('A felhasználó még nem aktiválta a profilját.');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      logger.error(`Login attempt with invalid password!`, { user });
      throw new Error('A megadott e-mail cím vagy jelszó nem megfelelő.');
    }

    logger.info(`User logged in!`, { user });

    return {
      token: generateToken(user.id),
      user,
    };
  },

  upvoteComment: async (_, { id }, context) => {
    const userID = getUserID(context);
    const comment = await context.prisma.updateComment({
      where: { id },
      data: { upvotes: { connect: { id: userID } } },
    });

    return comment;
  },

  unvoteComment: async (_, { id }, context) => {
    const userID = getUserID(context);
    const comment = await context.prisma.updateComment({
      where: { id },
      data: { upvotes: { disconnect: { id: userID } } },
    });

    return comment;
  },

  submitComment: async (_, { noteID, input: { text, locationInText } }, context) => {
    const userID = getUserID(context);

    const note = await context.prisma.note({ id: noteID });
    const comment = await context.prisma.createComment({
      text,
      locationInText: JSON.parse(locationInText),
      note: { connect: { id: noteID } },
      author: { connect: { id: userID } },
    });

    const editor = new Editor({ value: Value.fromJSON(note.text) });
    const newValue = editor
      .select(Range.fromJSON(JSON.parse(locationInText)))
      .addMark({ type: 'comment', data: { id: comment.id, show: false } }).value;

    await context.prisma.updateNote({ where: { id: noteID }, data: { text: newValue.toJSON() } });

    return comment;
  },

  deleteComment: async (_, { noteID, id }, context) => {
    const comment = await context.prisma.comment({ id });
    const note = await context.prisma.note({ id: noteID });

    const editor = new Editor({ value: Value.fromJSON(note.text) });
    const newValue = editor
      .select(Range.fromJSON(comment.locationInText))
      .removeMark({ type: 'comment', data: { id, show: false } }).value;

    await context.prisma.updateNote({ where: { id: noteID }, data: { text: newValue.toJSON() } });
    await context.prisma.deleteComment({ id });

    return true;
  },

  updateNote: (_, { id, text }, context) => {
    const note = context.prisma.updateNote({ where: { id }, data: { text } });
    return note;
  },

  uploadImage: async (_, { fileName, fileType }) => {
    const s3 = new S3();
    const s3Params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };

    const url = await s3.getSignedUrl('putObject', s3Params);
    return {
      url,
    };
  },

  bulkCreateUser: async (_, { userDataList }, context) => {
    for (const user of userDataList) {
      const { email } = user;
      validateEmail(email);
    }

    for (const user of userDataList) {
      const { email, firstName, lastName, userType } = user;
      await context.prisma.createUser({
        email,
        firstName,
        lastName,
        password: await hashPassword(email),
        role: userType,
      });
      logger.info('User created!', { user });
    }

    return true;
  },

  sendInvites: async (_, {}, context) => {
    const usersToRegister = await context.prisma.users({
      where: {
        isActive: false,
      },
    });

    usersToRegister.forEach(async (user) => {
      const { firstName, email } = user;
      const token = generateToken(email, { expiresIn: '1y' });
      await context.prisma.createPasswordSetToken({ token, email });
      const templateID = user.role === 'PROFESSOR' ? 9 : 5;
      try {
        sendEmail(
          { email: 'welcome@cogito.study', name: `${randomFounder()} from Cogito` },
          [{ email, name: firstName }],
          ['Welcome'],
          { link: `https://cogito.study/register?token=${token}&id=${user.id}` },
          templateID,
        );
        logger.info('Invite email sent!', { user });
      } catch {
        logger.error('Failed to send invite email!', { user });
        throw new Error('Failed to send invite email!');
      }
    });
    return true;
  },

  activate: async (_, { token, password }, context) => {
    validatePassword(password);
    const entry = await context.prisma.passwordSetToken({ token });
    if (entry === null) {
      logger.error(`Active user tried to re-activate with token`, { token });
      throw new Error('A megadott felhasználó korábban már regisztrált.');
    }
    const { email } = entry;
    const user = await context.prisma.user({ email });

    if (resetPassword(token, password, context)) {
      await context.prisma.updateUser({
        where: { id: user.id },
        data: { isActive: true },
      });
      logger.info(`User activated!`, { user });
      return true;
    }
    logger.error(`Activation unsuccessful!`, { user });
    throw new Error('Sikertelen regisztráció');
  },

  sendResetPasswordEmail: async (_, { email }, context) => {
    validateEmail(email);
    const entries = await context.prisma.passwordSetTokens({ where: { email } });
    if (entries.length > 0) {
      if (entries.length > 1) {
        logger.error('More than 1 password reset token in db!', { entries });
        throw new Error('Too many tokens in DB!');
      }
      const now = new Date();
      const entryCreated = new Date(entries[0].createdAt);
      const diffMs = now.getTime() - entryCreated.getTime();
      const diffMins = diffMs / 1000 / 60; // millisecs / secs
      if (diffMins < 12) {
        logger.error('Repeated password reset attempt!', { email });
        throw new Error(`Kérlek várj még ${12 - Math.floor(diffMins)} percet`);
      }
      await context.prisma.deletePasswordSetToken({ email });
    }

    const token = generateToken(email, { expiresIn: '1d' });
    await context.prisma.createPasswordSetToken({ token, email });
    try {
      sendEmail(
        { email: 'welcome@cogito.study', name: `${randomFounder()} from Cogito` },
        [{ email }],
        ['Welcome'],
        { link: `https://cogito.study/reset?token=${token}` },
        3,
      );
      logger.info('Password reset email sent!', { email });
      return true;
    } catch (error) {
      logger.error('Failed to send invite email!', { email });
      throw error;
    }
  },

  resetPassword: async (_, { token, password }, context) => {
    validatePassword(password);
    return resetPassword(token, password, context);
  },

  checkTokenValid: async (_, { token }, context) => {
    const entries = await context.prisma.passwordSetTokens({ where: { token } });
    if (entries.length > 1) {
      throw Error('Too many tokens in DB!');
    }
    return checkTokenValid(entries[0].token);
  },
};
