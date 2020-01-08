import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const NoteComment = objectType({
  name: 'NoteComment',
  definition(t) {
    t.model.id();
    t.model.content();

    t.model.author();
    t.model.likers({ filtering: { deletedAt: true } });
    t.model.thread();
    t.model.threadReply();

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the note comment',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.noteComments
          .findOne({ where: { id } })
          .likers({ where: { deletedAt: null } });
        return likers.length;
      },
    });

    t.field('permissions', {
      type: 'NoteCommentPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.noteCommentPermissions.findMany({
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
