import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Range, Value, Editor } from 'slate';
import { createTransport, SendMailOptions } from 'nodemailer';
import { S3 } from 'aws-sdk';
import * as logger from 'heroku-logger';

import * as EmailValidator from 'email-validator';

import { MutationResolvers } from '../generated/graphqlgen';
import { getUserID, sendEmail } from '../utils';

const hashPassword = (password: string) => hash(password, 10);
const generateToken = (userID: string) => sign({ userID }, process.env.APP_SECRET);

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

  activate: async (_, { id, password }, context) => {
    const user = await context.prisma.user({ id });

    if (user.isActive) {
      logger.error(`Active user tried to re-activate!`, { user });
      throw new Error('A megadott felhasználó korábban már regisztrált.');
    }

    const updatedUser = await context.prisma.updateUser({
      where: { id },
      data: { isActive: true, password: await hashPassword(password) },
    });

    logger.info(`User activated!`, { user });

    return {
      token: generateToken(updatedUser.id),
      user: updatedUser,
    };
  },

  forgotPassword: async (_, { email }, context) => {
    const user = await context.prisma.user({ email });

    if (!user) {
      return false;
    }

    const token = generateToken(user.id);
    const redirectURL = `${process.env.REACT_APP_URL}/reset-password/${token}`;

    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'trademedicmatt@gmail.com',
        pass: 'Predator95',
      },
    });

    const mailOptions: SendMailOptions = {
      from: 'trademedicmatt@gmail.com',
      to: 'matepapp@icloud.com',
      subject: 'Test forgot password',
      html: `<h1>Elfelejtetted a jelszavad?</h1><p>Akkor kattints <a href=${redirectURL}>erre a linkre</a>!</p>`,
    };

    logger.info(`Forgot password email sent!`, { user });

    return true;
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
      if (!EmailValidator.validate(email)) {
        throw new Error(`Email not valid: ${email}`);
      }
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
      const token = generateToken(email);
      await context.prisma.passwordSetToken({ token, email });
      try {
        sendEmail(
          { email: 'welcome@cogito.study', name: 'Berci from Cogito' },
          [{ email, name: firstName }],
          ['Welcome'],
          { link: `https://cogito.study/activate/${token}` },
          5,
        );
        logger.info('Invite email sent!', { user });
      } catch (error) {
        logger.error('Failed to send invite email!', { user }); // TODO better errro handling
        throw error;
      }
    });
    return true;
  },

  sendResetPasswordEmail: async (_, { email }, context) => {
    const entries = await context.prisma.passwordSetTokens({ where: { email } });
    if (entries.length > 0) {
      if (entries.length > 1) {
        logger.error('More than 1 password reset token in db!', { entries });
        throw new Error('Too many tokens in DB!');
      }
      // <stackoverflow src="https://stackoverflow.com/a/7709819/4481967">
      const now = new Date();
      const entryCreated = new Date(entries[0].createdAt);
      const diffMs = now.getMilliseconds() - entryCreated.getMilliseconds();
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      // </stackoverflow>
      if (diffMins <= 9) {
        logger.info('Repeated password reset attempt!', { email });
        return 'WAIT';
      }
      await context.prisma.deletePasswordSetToken({ email });
    }
    const token = generateToken(email);
    await context.prisma.createPasswordSetToken({ token, email });
    try {
      sendEmail(
        { email: 'welcome@cogito.study', name: 'Berci from Cogito' },
        [{ email }],
        ['Welcome'],
        { link: `https://cogito.study/reset/${token}` },
        3,
      );
      logger.info('Password reset email sent!', { email });
      return 'OK';
    } catch (error) {
      logger.error('Failed to send invite email!', { email });
      throw error;
    }
  },

  resetPassword: async (_, { token, password }, context) => {
    const entries = await context.prisma.passwordSetTokens({ where: { token } });
    if (entries.length > 0) {
      if (entries.length > 1) {
        logger.error('More than 1 password reset token in db!', { entries });
        throw new Error('Too many tokens in DB!');
      }
      const { email } = entries[0];
      const user = await context.prisma.user({ email });
      const newPassword = await hashPassword(password);
      await context.prisma.updateUser({ where: { email }, data: { password: newPassword } });
      return true;
    }
    return false;
  },
};
