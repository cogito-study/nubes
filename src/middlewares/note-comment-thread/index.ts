import { deleteNoteCommentThread } from './note-comment-thread.authorization';

export const noteCommentThreadMiddlewares = {
  Mutation: {
    deleteNoteCommentThread,
  },
  Query: {},
};
