import { inputObjectType } from 'nexus';

export const CreateFacultyInput = inputObjectType({
  name: 'CreateFacultyInput',
  description: 'Input of create faculty',
  definition(t) {
    t.string('name', { required: true });
    t.field('institute', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateFacultyInput = inputObjectType({
  name: 'UpdateFacultyInput',
  description: 'Input of update faculty',
  definition(t) {
    t.string('name');
  },
});
