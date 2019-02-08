import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Range, Value, Editor } from 'slate';
import { createTransport, SendMailOptions } from 'nodemailer';
import * as request from 'request';
import { S3 } from 'aws-sdk';

import * as EmailValidator from 'email-validator';

import { MutationResolvers } from '../generated/graphqlgen';
import { getUserID } from '../utils';

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

    return {
      token: generateToken(user.id),
      user,
    };
  },

  login: async (_, { email, password }, context) => {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error('A megadott e-mail cím vagy jelszó nem megfelelő.');
    }

    if (!user.isActive) {
      throw new Error('A felhasználó még nem aktiválta a profilját.');
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('A megadott e-mail cím vagy jelszó nem megfelelő.');
    }

    return {
      token: generateToken(user.id),
      user,
    };
  },

  activate: async (_, { id, password }, context) => {
    const user = await context.prisma.user({ id });

    if (user.isActive) {
      throw new Error('A megadott felhasználó korábban már regisztrált.');
    }

    const updatedUser = await context.prisma.updateUser({
      where: { id },
      data: { isActive: true, password: await hashPassword(password) },
    });

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
    }
    return true;
  },
  sendInvites: (_, {}, _context) => {
    const options = {
      method: 'POST',
      url: 'https://api.sendinblue.com/v3/smtp/email',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.SIB_API_KEY,
      },
      body: {
        tags: ['Welcome'],
        sender: { name: 'Berci', email: 'welcome@cogito.study' },
        to: [{ email: 'berci.kormendy@cogito.study', name: 'Berci' }],
        replyTo: { email: 'support@cogito.study' },
        params: { name: 'Dudeon' },
        templateId: 1,
      },
      json: true,
    };

    request(options, function(error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

    return true;
  },
};
