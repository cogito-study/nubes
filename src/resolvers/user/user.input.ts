import { inputObjectType } from 'nexus';

export const UpdateProfileInput = inputObjectType({
  name: 'UpdateProfileInput',
  description: "Input of update user's profile",
  definition(t) {
    t.string('email', { nullable: true });
    t.string('oldPassword', { nullable: true });
    t.string('newPassword', { nullable: true });
    t.field('preferredLanguage', { nullable: true, type: 'ConnectRelation' });
  },
});
