// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { SubjectResolvers } from "../generated/graphqlgen";

export const Subject: SubjectResolvers.Type = {
  ...SubjectResolvers.defaultResolvers,

  faculty: ({ id }, _, context) => context.prisma.subject({ id }).faculty(),
  students: ({ id }, _, context) => context.prisma.subject({ id }).students(),
  info: ({ id }, _, context) => context.prisma.subject({ id }).info(),
  prerequisites: ({ id }, _, context) =>
    context.prisma.subject({ id }).prerequisites(),
  notes: ({ id }, _, context) => context.prisma.subject({ id }).notes()
};
