import { objectType, enumType } from 'nexus';
import { SubjectInformationPermissionType } from '@generated/photon';

export const SubjectInformationPermission = objectType({
  name: 'SubjectInformationPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'SubjectInformationPermissionTypeEnum',
        members: SubjectInformationPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'SubjectInformation' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
