import { deletePostComment, updatePostComment } from './post-comment.authorization';

export const postMiddlewares = {
  Mutation: {
    updatePostComment,
    deletePostComment,
  },
};
