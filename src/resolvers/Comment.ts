import { CommentResolvers } from "../generated/graphqlgen";

export const Comment: CommentResolvers.Type = {
  ...CommentResolvers.defaultResolvers,

  author: ({ id }, _, context) => context.prisma.comment({ id }).author(),
  note: ({ id }, _, context) => context.prisma.comment({ id }).note(),
  replies: ({ id }, _, context) => context.prisma.comment({ id }).replies(),
  upvotes: ({ id }, _, context) => context.prisma.comment({ id }).upvotes()
};
