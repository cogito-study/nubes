import { AuthenticationError } from 'apollo-server';
import { extendType } from 'nexus';
import { validateToken } from '../../utils/token';

export const MajorQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.majors();
    t.field('majorByToken', {
      type: 'Major',
      nullable: true,
      args: { data: 'MajorByTokenInput', where: 'WhereUniqueInput' },
      resolve: async (_, { data: { token }, where }, context) => {
        const activationToken = await validateToken({ token, type: 'ACTIVATION', context });
        if (activationToken === null) throw new AuthenticationError('Invalid or expired token');

        return await context.photon.majors.findOne({ where });
      },
    });
  },
});
