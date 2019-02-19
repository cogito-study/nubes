import { InstituteResolvers } from '../generated/graphqlgen';

export const Institute: InstituteResolvers.Type = {
  ...InstituteResolvers.defaultResolvers,

  subjects: ({ id }, _, context) => context.prisma.institute({ id }).subjects(),
};
