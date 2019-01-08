import { NoteResolvers } from "../generated/graphqlgen";

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  author: ({ id }, _, ctx) => ctx.prisma.note({ id }).author(),
  comments: ({ id }, _, ctx) => ctx.prisma.note({ id }).comments(),
  subject: ({ id }, _, ctx) => ctx.prisma.note({ id }).subject(),
  upvotes: ({ id }, _, ctx) => ctx.prisma.note({ id }).upvotes()
};
