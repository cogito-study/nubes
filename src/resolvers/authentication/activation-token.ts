import { objectType } from 'nexus';

export const ActivationToken = objectType({
  name: 'ActivationToken',
  definition(t) {
    t.model.id();
    t.model.token();
    t.model.user();
    t.model.createdAt();
  },
});
