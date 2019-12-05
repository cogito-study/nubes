import { Middleware } from '../types';
import { deleteNoteComment, updateNoteComment } from './note-comment.authorization';

export const noteCommentMiddlewares: Middleware = {
  Mutation: {
    updateNoteComment,
    deleteNoteComment,
  },
  Query: {},
};
