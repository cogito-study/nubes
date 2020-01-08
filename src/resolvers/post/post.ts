import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.content();

    t.model.author();
    t.model.comments({ filtering: { deletedAt: true } });
    t.model.likers({ filtering: { deletedAt: true } });
    t.model.subject();

    t.field('hasLikedPost', {
      type: 'Boolean',
      description: 'Whether the logged in user liked a post before',
      resolve: async ({ id }, _, context) => {
        const likers = await context.photon.posts
          .findOne({ where: { id } })
          .likers({ where: { deletedAt: null }, select: { id: true } });
        const userID = getUserID(context);

        return likers.some(({ id }) => id === userID);
      },
    });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the post',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.posts
          .findOne({ where: { id } })
          .likers({ where: { deletedAt: null } });
        return likers.length;
      },
    });

    t.field('permissions', {
      type: 'PostPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.postPermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
            deletedAt: null,
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
