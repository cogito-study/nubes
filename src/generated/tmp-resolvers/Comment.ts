// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { CommentResolvers } from '../graphqlgen';

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  note: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  author: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  replies: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
  upvotes: (parent, args, ctx) => {
    throw new Error('Resolver not implemented');
  },
};
