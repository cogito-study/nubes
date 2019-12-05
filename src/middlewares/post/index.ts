import { Middleware } from '../types';
import { createPostComment, deletePost, updatePost } from './post.authorization';

export const postMiddlewares: Middleware = {
  Mutation: {
    createPostComment,
    updatePost,
    deletePost,
  },
};
