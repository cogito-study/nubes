import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreateMajorInput, UpdateMajorInput } from './major.input';

export const MajorMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createMajor', {
      type: 'Major',
      args: { data: CreateMajorInput.asArg({ required: true }) },
      resolve: (_, { data: { faculty, ...rest } }, ctx) => {
        return ctx.photon.majors.create({
          data: {
            faculty: { connect: faculty },
            ...rest,
          },
        });
      },
    });

    t.field('updateMajor', {
      type: 'Major',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateMajorInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.majors.update({
          where,
          data,
        });
      },
    });

    t.field('deleteMajor', {
      type: 'Major',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.majors.delete({
          where,
        });
      },
    });
  },
});
