import { AuthenticationError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType } from 'nexus';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';
import { validateActivationToken } from '../../utils/token';

export const MajorQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.majors();
    t.field('majorByToken', {
      type: 'Major',
      nullable: true,
      args: { data: 'MajorByTokenInput', where: 'WhereUniqueInput' },
      resolve: async (_, { data: { token }, where }, context) => {
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        return deleteSoftDeletedObjectFromResponse<NexusGenRootTypes['Major']>(
          await context.photon.majors.findOne({ where }),
        );
      },
    });
  },
});
