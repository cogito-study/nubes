import { objectType, enumType } from 'nexus';
import { UserPermissionType } from '@generated/photon';

export const UserPermission = objectType({
  name: 'UserPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'UserPermissionTypeEnum',
        members: UserPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'User' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
