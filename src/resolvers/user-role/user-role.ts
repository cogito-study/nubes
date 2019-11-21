import { objectType } from 'nexus';

export const UserRole = objectType({
  name: 'UserRole',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
