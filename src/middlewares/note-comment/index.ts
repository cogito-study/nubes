import { updateNoteComment, deleteNoteComment } from './note-comment.authorization';

export const noteCommentMiddlewares = {
  Mutation: {
    updateNoteComment,
    deleteNoteComment,
  },
  Query: {},
};
