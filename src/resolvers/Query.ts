import { QueryResolvers } from "../generated/graphqlgen";
import { getUserId } from "../utils";

export const Query: QueryResolvers.Type = {
  ...QueryResolvers.defaultResolvers,

  me: (_, _args, context) => context.prisma.user({ id: getUserId(context) }),
  notes: (_, _args, context) => context.prisma.notes(),
  subjects: (_, _args, context) => context.prisma.subjects(),
  users: (_, _args, context) => context.prisma.users(),
  note: (_, { id }, context) => context.prisma.note({ id }),
  subject: (_, { id }, context) => context.prisma.subject({ id })
};
