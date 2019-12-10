import { inputObjectType } from 'nexus';

export const ChangePasswordInput = inputObjectType({
  name: 'ChangePasswordInput',
  definition(t) {
    t.string('oldPassword', { required: true });
    t.string('newPassword', { required: true });
  },
});

export const ChangeEmailInput = inputObjectType({
  name: 'ChangeEmailInput',
  definition(t) {
    t.string('email', { required: true });
  },
});

export const ChangePreferredLanguageInput = inputObjectType({
  name: 'ChangePreferredLanguageInput',
  description: "Input of update user's profile",
  definition(t) {
    t.field('preferredLanguage', { type: 'ConnectRelation', required: true });
  },
});
