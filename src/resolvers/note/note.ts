import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.contentHTML();
    t.model.title();
    t.model.number();
    t.model.description();
    t.model.noteCategory();

    t.model.commentThreads({ filtering: { deletedAt: true } });
    t.model.authors({ filtering: { deletedAt: true } });
    t.model.likers({ filtering: { deletedAt: true } });
    t.model.highlights({ filtering: { deletedAt: true } });
    t.model.subject();

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the note',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.notes
          .findOne({ where: { id } })
          .likers({ where: { deletedAt: null } });
        return likers.length;
      },
    });

    t.field('permissions', {
      type: 'NotePermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.notePermissions.findMany({
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
