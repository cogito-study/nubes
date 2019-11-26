import { inputObjectType } from 'nexus';

export const UpdateDepartmentInput = inputObjectType({
  name: 'UpdateDepartmentInput',
  description: 'Input of update department',
  definition(t) {
    t.string('name');
    t.string('description');
    t.field('leader', { type: 'ConnectRelation' });
  },
});
