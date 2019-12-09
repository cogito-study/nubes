import { AuthenticationError } from 'apollo-server';
import { extendType, stringArg } from 'nexus';
import { validateToken } from '../../utils/token';

export const InstituteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.institute();
    t.crud.institutes();

    t.field('institutesByToken', {
      type: 'Institute',
      args: { token: stringArg({ required: true }) },
      list: true,
      resolve: async (_, { token }, context) => {
        const activationToken = await validateToken({ token, type: 'ACTIVATION', context });
        if (activationToken === null) throw new AuthenticationError('Invalid token');

        return await context.photon.institutes.findMany();
      },
    });
  },
});
