import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const PostComment = objectType({
  name: 'PostComment',
  definition(t) {
    t.model.id();
    t.model.content();

    t.model.author({ type: 'User' });
    t.model.post({ type: 'Post' });
    t.model.likers({ type: 'User' });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the postComment',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.postComments.findOne({ where: { id } }).likers();
        return likers.length;
      },
    });

    t.field('permissions', {
      type: 'PostCommentPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.postCommentPermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
          },
          select: {
            type: true,
          },
        });
        return permissions.map((p) => p.type);
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
