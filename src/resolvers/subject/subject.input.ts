import { inputObjectType } from 'nexus';

export const CreateSubjectInput = inputObjectType({
  name: 'CreateSubjectInput',
  description: 'Input of create subject',
  definition(t) {
    t.string('code', { required: true });
    t.string('name', { required: true });
    t.string('description', { required: true });
    t.field('department', { type: 'ConnectRelation', required: true });
    t.field('language', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateSubjectInput = inputObjectType({
  name: 'UpdateSubjectInput',
  description: 'Input of update subject',
  definition(t) {
    t.string('code');
    t.string('name');
    t.string('description');
  },
});
