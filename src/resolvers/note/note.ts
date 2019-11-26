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

    t.model.commentThreads({ type: 'NoteCommentThread' });
    t.model.authors({ type: 'User' });
    t.model.likers({ type: 'User' });
    t.model.highlights({ type: 'NoteHighlight' });
    t.model.subject({ type: 'Subject' });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the note',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.notes.findOne({ where: { id } }).likers();
        return likers.length;
      },
    });

    t.field('permissions', {
      type: 'NotePermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.notePermissions.findMany({
          where: {
            objects: { some: { id } },
            permissions: { some: { users: { some: { id: getUserID(context) } } } },
          },
          select: {
            type: true,
          },
        });
        return await permissions.map((p) => p.type);
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
