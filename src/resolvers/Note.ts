import { NoteResolvers } from '../generated/graphqlgen';

export const Note: NoteResolvers.Type = {
  ...NoteResolvers.defaultResolvers,

  authors: ({ id }, _, context) => context.prisma.note({ id }).authors(),
  comments: ({ id }, _, context) => context.prisma.note({ id }).comments(),
  subject: ({ id }, _, context) => context.prisma.note({ id }).subject(),
  upvotes: ({ id }, _, context) => context.prisma.note({ id }).upvotes(),
};
