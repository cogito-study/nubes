import { inputObjectType } from 'nexus';

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  description: 'Input of login',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  description: 'Input of update user',
  definition(t) {
    t.string('email');
    t.string('password');
  },
});
