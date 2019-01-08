import { NoteResolvers } from "../generated/graphqlgen";

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  author: ({ id }, _, context) => context.prisma.note({ id }).author(),
  comments: ({ id }, _, context) => context.prisma.note({ id }).comments(),
  subject: ({ id }, _, context) => context.prisma.note({ id }).subject(),
  upvotes: ({ id }, _, context) => context.prisma.note({ id }).upvotes()
};
