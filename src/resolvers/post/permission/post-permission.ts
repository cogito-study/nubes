import { objectType, enumType } from 'nexus';
import { PostPermissionType } from '@generated/photon';

export const PostPermission = objectType({
  name: 'PostPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'PostPermissionTypeEnum',
        members: PostPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Post' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
