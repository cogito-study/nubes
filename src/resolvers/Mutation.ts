import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { Range, Value, Editor } from 'slate';

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
    const isValidPassword = await compare(password, user.password);

    if (!user || !isValidPassword) {
      throw new Error('A megadott e-mail cím vagy jelszó nem megfelelő.');
    }

    return {
      token: generateToken(user.id),
      user,
    };
  },
  activate: async (parent, { id, password }, context) => {
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

    const note = context.prisma.note({ id: noteID });

    // új slate editor kontroller létrehozása (html komponens nélkül)
    const editor = new Editor({ value: note.text });

    // az editor beilleszti az új kommenthez kapcsolódó dolgokat a jegyzet szövegébe
    const newValue = editor
      .select(Range.fromJSON(locationInText))
      .addMark({ type: 'comment', data: { id: comment.id, show: false } }).value;

    // a jegyzet szövegét update-eljük
    context.prisma.updateNote({ where: { id: noteID }, data: { text: newValue } });

    return comment;
  },
  deleteComment: async (parent, { noteID, id }, context) => {
    const comment = await context.prisma.comment({ id });
    const note = context.prisma.note({ id: noteID });

    // új slate editor kontroller létrehozása (html komponens nélkül)
    const editor = new Editor({ value: note.text });

    // az editor kiveszi a törölt kommenthez kapcsolódó dolgokat a jegyzet szövegéből
    const newValue = editor
      .select(Range.fromJSON(comment.locationInText))
      .removeMark({ type: 'comment', data: { id: comment.id, show: false } }).value;

    // a jegyzet szövegét update-eljük
    context.prisma.updateNote({ where: { id: noteID }, data: { text: newValue } });

    await context.prisma.deleteComment({ id });
    return true;
  },
  updateNote: (parent, { id, text }, context) => {
    const note = context.prisma.updateNote({ where: { id }, data: { text } });
    return note;
  },
};
