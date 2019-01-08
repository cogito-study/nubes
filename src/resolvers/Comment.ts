import { CommentResolvers } from "../generated/graphqlgen";

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  author: ({ id }, _, ctx) => ctx.prisma.comment({ id }).author(),
  note: ({ id }, _, ctx) => ctx.prisma.comment({ id }).note(),
  replies: ({ id }, _, ctx) => ctx.prisma.comment({ id }).replies(),
  upvotes: ({ id }, _, ctx) => ctx.prisma.comment({ id }).upvotes()
};
