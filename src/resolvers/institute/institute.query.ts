import { AuthenticationError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType, stringArg } from 'nexus';
import { validateActivationToken } from '../../utils/token';

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
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_token'));

        return await context.photon.institutes.findMany();
      },
    });
  },
});
