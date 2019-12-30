import { extendType } from 'nexus';
import { WhereUniqueInput } from '..';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';

export const DepartmentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('department', {
      type: 'Department',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      nullable: true,
      resolve: async (_, { where }, ctx) => {
        return deleteSoftDeletedObjectFromResponse<NexusGenRootTypes['Department']>(
          await ctx.photon.departments.findOne({ where }),
        );
      },
    });
  },
});
