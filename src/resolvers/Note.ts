import { NoteResolvers } from "../generated/graphqlgen";

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  author: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  comments: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  subject: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  },
  upvotes: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
