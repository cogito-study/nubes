import { SubjectInfoResolvers } from "../generated/graphqlgen";

export const SubjectInfo: SubjectInfoResolvers.Type = {
  ...SubjectInfoResolvers.defaultResolvers,

  subject: ({ id }, _, ctx) => ctx.prisma.subjectInfo({ id }).subject()
};
