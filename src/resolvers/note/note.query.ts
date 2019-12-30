import { extendType } from 'nexus';
import { WhereUniqueInput } from '..';
import { NexusGenRootTypes } from '../../../generated/nexus-typegen';
import { deleteSoftDeletedObjectFromResponse } from '../../utils/soft-delete';

export const NoteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('note', {
      type: 'Note',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      nullable: true,
      resolve: async (_, { where }, ctx) => {
        return deleteSoftDeletedObjectFromResponse<NexusGenRootTypes['Note']>(
          await ctx.photon.notes.findOne({ where }),
        );
      },
    });
  },
});
