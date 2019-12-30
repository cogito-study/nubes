import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreateInstituteInput, UpdateInstituteInput } from './institute.input';

export const InstituteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createInstitute', {
      type: 'Institute',
      args: { data: CreateInstituteInput.asArg({ required: true }) },
      resolve: (_, { data }, ctx) => {
        return ctx.photon.institutes.create({
          data,
        });
      },
    });

    t.field('updateInstitute', {
      type: 'Institute',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateInstituteInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.institutes.update({
          where,
          data,
        });
      },
    });

    t.field('deleteInstitute', {
      type: 'Institute',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.institutes.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});
