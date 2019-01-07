import { CommentResolvers } from "../generated/graphqlgen";

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  id: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
