import { inputObjectType } from 'nexus';

export const UpdateSubjectInput = inputObjectType({
  name: 'UpdateSubjectInput',
  description: 'Input of update subject',
  definition(t) {
    t.string('code');
    t.string('name');
    t.string('description');
  },
});
