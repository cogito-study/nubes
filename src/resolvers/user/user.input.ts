import { inputObjectType } from 'nexus';

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  description: 'Input of update user',
  definition(t) {
    t.string('email');
    t.string('password');
  },
});
