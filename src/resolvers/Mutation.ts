import { MutationResolvers } from '../generated/graphqlgen';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { getUserID } from '../utils';

const hashPassword = (password: String) => hash(password, 10);
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
      throw new Error(`No user found for email: ${email}`);
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid password or email');
    }

    return {
      token: generateToken(user.id),
      user,
    };
  },
  activate: async (parent, { id, password }, context) => {
    const user = await context.prisma.updateUser({
      where: { id },
      data: { isActive: true, password: await hashPassword(password) },
    });

    return {
      token: generateToken(user.id),
      user,
    };
  },
  upvoteComment: async (parent, { id }, context) => {
    const userID = getUserID(context);
    const comment = await context.prisma.updateComment({
      where: { id },
      data: { upvotes: { connect: { id: userID } } },
    });

    return comment;
  },
  unvoteComment: async (parent, { id }, context) => {
    const userID = getUserID(context);
    const comment = await context.prisma.updateComment({
      where: { id },
      data: { upvotes: { disconnect: { id: userID } } },
    });

    return comment;
  },
  submitComment: async (parent, { noteID, input: { text, locationInText } }, context) => {
    const userID = getUserID(context);
    const comment = await context.prisma.createComment({
      text,
      locationInText: JSON.parse(locationInText),
      note: { connect: { id: noteID } },
      author: { connect: { id: userID } },
    });

    return comment;
  },
  deleteComment: async (parent, { id }, context) => {
    await context.prisma.deleteComment({ id });
    return true;
  },
  updateNote: (parent, { id, text }, context) => {
    const note = context.prisma.updateNote({ where: { id }, data: { text } });
    return note;
  },
};
