import { objectType } from '@prisma/nexus';

export const UserRole = objectType({
  name: 'UserRole',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type;

    t.model.users({ type: 'User' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
