import { AuthenticationError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType } from 'nexus';
import { validateActivationToken } from '../../utils/token';

export const MajorQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.majors({ filtering: { deletedAt: true } });

    t.field('majorByToken', {
      type: 'Major',
      nullable: true,
      args: { data: 'MajorByTokenInput', where: 'WhereUniqueInput' },
      resolve: async (_, { data: { token }, where }, context) => {
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        const majors = await context.photon.majors.findMany({
          where: { ...where, deletedAt: null },
        });

        if (majors && majors[0]) return majors[0];

        return null;
      },
    });
  },
});
