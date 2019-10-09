import { inputObjectType } from 'nexus';

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  description: 'Input of login',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});
export const ActivateUserInput = inputObjectType({
  name: 'ActivateUserInput',
  description: 'Input of activation user',
  definition(t) {
    t.string('token', { required: true });
    t.string('password', { required: true });
  },
});
export const ResetPasswordInput = inputObjectType({
  name: 'ResetPasswordInput',
  description: 'Input of reset password',
  definition(t) {
    t.string('token', { required: true });
    t.string('password', { required: true });
  },
});

export const ForgotPasswordInput = inputObjectType({
  name: 'ForgotPasswordInput',
  description: 'Input of forgot password',
  definition(t) {
    t.string('email');
  },
});
