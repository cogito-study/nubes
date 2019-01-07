import { CommentResolvers } from "../generated/graphqlgen";

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  author: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  note: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  replies: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  upvotes: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
