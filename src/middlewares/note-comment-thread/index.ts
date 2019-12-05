import { Middleware } from '../types';
import { deleteNoteCommentThread } from './note-comment-thread.authorization';

export const noteCommentThreadMiddlewares: Middleware = {
  Mutation: {
    deleteNoteCommentThread,
  },
  Query: {},
};
