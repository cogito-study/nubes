import { NoteResolvers } from "../generated/graphqlgen";

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  id: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
