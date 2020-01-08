import { objectType } from 'nexus';

export const PasswordToken = objectType({
  name: 'PasswordToken',
  definition(t) {
    t.model.id();
    t.model.token();

    t.model.user();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
