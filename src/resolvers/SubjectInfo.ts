import { SubjectInfoResolvers } from '../generated/graphqlgen';

export const SubjectInfo: SubjectInfoResolvers.Type = {
  ...SubjectInfoResolvers.defaultResolvers,

  subject: ({ id }, _, context) => context.prisma.subjectInfo({ id }).subject(),
};
