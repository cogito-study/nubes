import { SubjectResolvers } from '../generated/graphqlgen';

export const Subject: SubjectResolvers.Type = {
  ...SubjectResolvers.defaultResolvers,
  institute: ({ id }, _, context) => context.prisma.subject({ id }).institute(),
  faculty: ({ id }, _, context) => context.prisma.subject({ id }).faculty(),
  students: ({ id }, _, context) => context.prisma.subject({ id }).students(),
  info: ({ id }, _, context) => context.prisma.subject({ id }).info(),
  prerequisites: ({ id }, _, context) => context.prisma.subject({ id }).prerequisites(),
  notes: ({ id }, _, context) => context.prisma.subject({ id }).notes(),
};
