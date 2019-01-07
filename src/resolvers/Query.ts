// This resolver file was scaffolded by github.com/prisma/graphqlgen, DO NOT EDIT.
// Please do not import this file directly but copy & paste to your application code.

import { QueryResolvers } from "../generated/graphqlgen";
import { getUserId } from "../utils";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,
  me: (parent, args, ctx) => {
    const userId = getUserId(ctx);
    return ctx.prisma.user({ id: userId });
  },
  notes: (parent, args, ctx) => {
    return ctx.prisma.notes();
  },
  subjects: (parent, args, ctx) => {
    return ctx.prisma.subjects();
  },
  note: (_, { id }, ctx) => ctx.prisma.note({ id }),
  subject: (_, { id }, ctx) => ctx.prisma.subject({ id })
};
