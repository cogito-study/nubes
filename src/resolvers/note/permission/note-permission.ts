import { objectType, enumType } from 'nexus';
import { NotePermissionType } from '@generated/photon';

export const NotePermission = objectType({
  name: 'NotePermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'NotePermissionTypeEnum',
        members: NotePermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Note' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
