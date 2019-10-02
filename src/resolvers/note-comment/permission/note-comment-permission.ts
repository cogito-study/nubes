import { objectType, enumType } from 'nexus';
import { NoteCommentPermissionType } from '@generated/photon';

export const NoteCommentPermission = objectType({
  name: 'NoteCommentPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'NoteCommentPermissionTypeEnum',
        members: NoteCommentPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'NoteComment' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
