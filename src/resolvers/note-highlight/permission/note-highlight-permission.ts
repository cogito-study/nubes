import { objectType, enumType } from 'nexus';
import { NoteHighlightPermissionType } from '@generated/photon';

export const NoteHighlightPermission = objectType({
  name: 'NoteHighlightPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'NoteHighlightPermissionTypeEnum',
        members: NoteHighlightPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'NoteHighlight' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
