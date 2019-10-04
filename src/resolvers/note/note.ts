import { objectType, enumType } from 'nexus';
import { NoteCategory } from '@generated/photon';

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.contentHTML();
    t.model.title();
    t.model.number();
    t.model.description();
    // TODO: Fix when prisma2 supports enums
    t.field('noteCategory', {
      type: enumType({
        name: 'NoteCategoryEnum',
        members: NoteCategory,
      }),
      resolve: ({ noteCategory }) => noteCategory,
    });

    t.model.suggestions({ type: 'Suggestion' });
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

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
