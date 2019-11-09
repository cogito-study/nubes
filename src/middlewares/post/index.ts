import { createPostComment, deletePost, updatePost } from './post.authorization';

export const postMiddlewares = {
  Mutation: {
    createPostComment,
    updatePost,
    deletePost,
  },
};
