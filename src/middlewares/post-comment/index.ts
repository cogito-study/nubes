import { Middleware } from '../types';
import { deletePostComment, updatePostComment } from './post-comment.authorization';

export const postMiddlewares: Middleware = {
  Mutation: {
    updatePostComment,
    deletePostComment,
  },
};
