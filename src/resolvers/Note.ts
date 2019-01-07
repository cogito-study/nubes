// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { NoteResolvers } from "../generated/graphqlgen";

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  id: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
