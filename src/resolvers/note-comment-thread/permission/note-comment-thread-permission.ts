import { objectType, enumType } from 'nexus';
import { NoteCommentThreadPermissionType } from '@generated/photon';

export const NoteCommentThreadPermission = objectType({
  name: 'NoteCommentThreadPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'NoteCommentThreadPermissionTypeEnum',
        members: NoteCommentThreadPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'NoteCommentThread' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
