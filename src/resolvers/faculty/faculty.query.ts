import { extendType } from 'nexus';
import { WhereUniqueInput } from '..';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';

export const FacultyQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('faculties', {
      type: 'Faculty',
      list: true,
      resolve: async (_, {}, ctx) => {
        return await ctx.photon.faculties.findMany({ where: { deletedAt: null } });
      },
    });

    t.field('faculty', {
      type: 'Faculty',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      nullable: true,
      resolve: async (_, { where }, ctx) => {
        return deleteSoftDeletedObjectFromResponse<NexusGenRootTypes['Faculty']>(
          await ctx.photon.faculties.findOne({ where }),
        );
      },
    });
  },
});
