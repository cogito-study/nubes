import { objectType, enumType } from 'nexus';
import { UserRoleType } from '@generated/photon';

export const UserRole = objectType({
  name: 'UserRole',
  definition(t) {
    t.model.id();
    t.model.name();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'UserRoleTypeEnum',
        members: UserRoleType,
      }),
      resolve: ({ type }) => type,
    });
    t.model.users({ type: 'User' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
