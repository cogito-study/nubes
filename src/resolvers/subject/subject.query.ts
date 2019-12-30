import { extendType } from 'nexus';
import { WhereUniqueInput } from '..';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('subject', {
      type: 'Subject',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      nullable: true,
      resolve: async (_, { where }, ctx) => {
        return deleteSoftDeletedObjectFromResponse<NexusGenRootTypes['Subject']>(
          await ctx.photon.subjects.findOne({ where }),
        );
      },
    });
  },
});
