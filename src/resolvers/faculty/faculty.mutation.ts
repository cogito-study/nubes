import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreateFacultyInput, UpdateFacultyInput } from './faculty.input';

export const FacultyMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createFaculty', {
      type: 'Faculty',
      args: { data: CreateFacultyInput.asArg({ required: true }) },
      resolve: (_, { data: { institute, ...rest } }, ctx) => {
        return ctx.photon.faculties.create({
          data: {
            institute: { connect: institute },
            ...rest,
          },
        });
      },
    });

    t.field('updateFaculty', {
      type: 'Faculty',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateFacultyInput.asArg({ required: true }),
      },
      resolve: (_, { where, data: { institute, ...rest } }, ctx) => {
        return ctx.photon.faculties.update({
          where,
          data: {
            institute: {
              connect: institute,
            },
            ...rest,
          },
        });
      },
    });

    t.field('deleteFaculty', {
      type: 'Faculty',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.faculties.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});
