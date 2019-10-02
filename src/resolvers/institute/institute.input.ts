import { inputObjectType } from 'nexus';

export const CreateInstituteInput = inputObjectType({
  name: 'CreateInstituteInput',
  description: 'Input of create institute',
  definition(t) {
    t.string('name', { required: true });
    t.string('description', { required: true });
  },
});

export const UpdateInstituteInput = inputObjectType({
  name: 'UpdateInstituteInput',
  description: 'Input of update institute',
  definition(t) {
    t.string('name');
    t.string('description');
  },
});
