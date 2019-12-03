import { inputObjectType } from 'nexus';

export const CreateMajorInput = inputObjectType({
  name: 'CreateMajorInput',
  description: 'Input of create major',
  definition(t) {
    t.string('name', { required: true });
    t.field('faculty', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateMajorInput = inputObjectType({
  name: 'UpdateMajorInput',
  description: 'Input of update major',
  definition(t) {
    t.string('name');
  },
});
