import { SubjectInfoResolvers } from "../generated/graphqlgen";

export const SubjectInfo: SubjectInfoResolvers.Type = {
  ...SubjectInfoResolvers.defaultResolvers,

  subject: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
