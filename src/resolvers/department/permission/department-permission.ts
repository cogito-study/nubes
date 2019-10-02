import { objectType, enumType } from 'nexus';
import { DepartmentPermissionType } from '@generated/photon';

export const DepartmentPermission = objectType({
  name: 'DepartmentPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'DepartmentPermissionTypeEnum',
        members: DepartmentPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Department' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
