import { QueryResolvers } from "../generated/graphqlgen";
import { getUserId } from "../utils";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  me: (_, _args, ctx) => ctx.prisma.user({ id: getUserId(ctx) }),
  notes: (_, _args, ctx) => ctx.prisma.notes(),
  subjects: (_, _args, ctx) => ctx.prisma.subjects(),
  users: (_, _args, ctx) => ctx.prisma.users(),
  note: (_, { id }, ctx) => ctx.prisma.note({ id }),
  subject: (_, { id }, ctx) => ctx.prisma.subject({ id })
};
