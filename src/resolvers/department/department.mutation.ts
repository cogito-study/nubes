import { extendType } from 'nexus';
import { optionalConnect } from '../../utils';
import { WhereUniqueInput } from '../input';
import { UpdateDepartmentInput } from './department.input';

export const DepartmentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
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
        return ctx.photon.departments.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});
