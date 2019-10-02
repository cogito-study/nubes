import { inputObjectType } from 'nexus';

export const CreateDepartmentInput = inputObjectType({
  name: 'CreateDepartmentInput',
  description: 'Input of create department',
  definition(t) {
    t.string('name', { required: true });
    t.string('description', { required: true });
    t.field('institute', { required: true, type: 'ConnectRelation' });
    t.field('leader', { required: true, type: 'ConnectRelation' });
  },
});

export const UpdateDepartmentInput = inputObjectType({
  name: 'UpdateDepartmentInput',
  description: 'Input of update department',
  definition(t) {
    t.string('name');
    t.string('description');
    t.field('leader', { type: 'ConnectRelation' });
  },
});
