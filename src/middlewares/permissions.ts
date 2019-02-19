import { rule, shield } from 'graphql-shield';

import { getUserID } from '../utils';
import { Context } from '../types';

const isAuthenticatedUser = rule('authenticated')((parent, args, context: Context) => {
  const userID = getUserID(context);
  return Boolean(userID);
});

const isAdmin = rule('admin')(async (parent, args, context: Context) => {
  const userID = getUserID(context);
  const user = await context.prisma.user({ id: userID });

  return user && user.role === 'ADMIN' ? true : 'Only teachers and admins can update the note.';
});

export const permissions = shield({
  Query: {
    me: isAuthenticatedUser,
    users: isAuthenticatedUser,
    notes: isAuthenticatedUser,
    subjects: isAuthenticatedUser,
    note: isAuthenticatedUser,
    comment: isAuthenticatedUser,
    subject: isAuthenticatedUser,
    // user: isAuthenticatedUser, // TODO: Implement token based user registration
  },
  Mutation: {
    upvoteComment: isAuthenticatedUser,
    unvoteComment: isAuthenticatedUser,
    submitComment: isAuthenticatedUser,
    deleteComment: isAuthenticatedUser,
    updateNote: isAdmin,
  },
});
