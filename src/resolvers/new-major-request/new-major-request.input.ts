import { inputObjectType } from 'nexus';

export const CreateNewMajorRequestInput = inputObjectType({
  name: 'CreateNewMajorRequest',
  description: 'Input of create new major request',
  definition(t) {
    t.string('institute', { required: true });
    t.string('faculty', { required: true });
    t.string('major', { required: true });
    t.string('token', { required: true });
  },
});
