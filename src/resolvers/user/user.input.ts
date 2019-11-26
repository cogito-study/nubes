import { inputObjectType } from 'nexus';

export const UpdateProfileInput = inputObjectType({
  name: 'UpdateProfileInput',
  description: "Input of update user's profile",
  definition(t) {
    t.string('email');
    t.string('password');
  },
});
