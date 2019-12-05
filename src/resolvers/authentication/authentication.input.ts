import { inputObjectType } from 'nexus';

export const LoginUserInput = inputObjectType({
  name: 'LoginUserInput',
  description: 'Input of login',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});

export const RegisterUserInput = inputObjectType({
  name: 'RegisterUserInput',
  description: 'Input of register',
  definition(t) {
    t.string('firstName', { required: true });
    t.string('lastName', { required: true });
    t.string('email', { required: true });
    t.string('password', { required: true });
    t.field('preferredLanguage', { type: 'ConnectRelation' });
  },
});

export const ValidateTokenInput = inputObjectType({
  name: 'ValidateTokenInput',
  definition(t) {
    t.string('token', { required: true });
    t.field('type', { type: 'TokenType', required: true });
  },
});

export const ActivateInvitationInput = inputObjectType({
  name: 'ActivateInvitationInput',
  description: 'Input of invite activation',
  definition(t) {
    t.string('token', { required: true });
    t.string('password', { required: true });
  },
});

export const ActivateRegistrationInput = inputObjectType({
  name: 'ActivateRegistrationInput',
  description: 'Input of register activation',
  definition(t) {
    t.string('token', { required: true });
    t.string('subjectIDs', { list: true, required: true });
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
