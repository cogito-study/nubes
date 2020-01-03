import { extendType } from 'nexus';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';
import { SubjectWhereUniqueInput } from './subject.input';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('subject', {
      type: 'Subject',
      args: {
        where: SubjectWhereUniqueInput.asArg({ required: true }),
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
