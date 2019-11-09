import { objectType, enumType } from 'nexus';
import { PostCommentPermissionType } from '@generated/photon';

export const PostCommentPermission = objectType({
  name: 'PostCommentPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'PostCommentPermissionTypeEnum',
        members: PostCommentPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'PostComment' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
