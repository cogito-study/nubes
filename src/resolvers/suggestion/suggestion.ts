import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Suggestion = objectType({
  name: 'Suggestion',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.approvedAt();
    t.model.rejectedAt();
    t.model.delta();

    t.model.likers({ filtering: { deletedAt: true } });
    t.model.note();
    t.model.author();
    t.model.approvedBy();

    t.field('permissions', {
      type: 'SuggestionPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.suggestionPermissions.findMany({
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

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the suggestion',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.suggestions
          .findOne({ where: { id } })
          .likers({ where: { deletedAt: null } });
        return likers.length;
      },
    });

    t.model.updatedAt();
    t.model.deletedAt();
  },
});
