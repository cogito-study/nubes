import { extendType } from 'nexus';
import { CreateDepartmentInput, UpdateDepartmentInput } from './department.input';
import { WhereUniqueInput } from '../input';
import { optionalConnect } from '../../utils';

export const DepartmentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createDepartment', {
      type: 'Department',
      args: { data: CreateDepartmentInput.asArg({ required: true }) },
      resolve: (_, { data: { institute, leader, ...rest } }, ctx) => {
        return ctx.photon.departments.create({
          data: {
            leader: { connect: leader },
            institute: { connect: institute },
            ...rest,
          },
        });
      },
    });

    t.field('updateDepartment', {
      type: 'Department',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateDepartmentInput.asArg({ required: true }),
      },
      resolve: (_, { where, data: { leader, ...rest } }, ctx) => {
        return ctx.photon.departments.update({
          where,
          data: {
            leader: optionalConnect(leader),
            ...rest,
          },
        });
      },
    });

    t.field('deleteDepartment', {
      type: 'Department',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.departments.delete({
          where,
        });
      },
    });
  },
});