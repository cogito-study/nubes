import { objectType, enumType } from 'nexus';
import { SubjectPermissionType } from '@generated/photon';

export const SubjectPermission = objectType({
  name: 'SubjectPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'SubjectPermissionTypeEnum',
        members: SubjectPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Subject' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
