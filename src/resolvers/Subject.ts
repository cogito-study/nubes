import { SubjectResolvers } from "../generated/graphqlgen";

export const Subject: SubjectResolvers.Type = {
  ...SubjectResolvers.defaultResolvers,

  id: (parent, args, ctx) => {
    throw new Error("Resolver not implemented");
  }
};
