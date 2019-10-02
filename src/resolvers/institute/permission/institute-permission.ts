import { objectType, enumType } from 'nexus';
import { InstitutePermissionType } from '@generated/photon';

export const InstitutePermission = objectType({
  name: 'InstitutePermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'InstitutePermissionTypeEnum',
        members: InstitutePermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Institute' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
