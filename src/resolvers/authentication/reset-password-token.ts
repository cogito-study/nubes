import { objectType } from 'nexus';

export const ResetPasswordToken = objectType({
  name: 'ResetPasswordToken',
  definition(t) {
    t.model.token();
    t.model.email();
    t.model.createdAt();
  },
});
