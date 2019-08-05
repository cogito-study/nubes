import { objectType } from '@prisma/nexus';

export const NoteCommentThread = objectType({
  name: 'NoteCommentThread',
  definition(t) {
    t.model.id();

    t.model.comment({ type: 'NoteComment' });
    t.model.replies({ type: 'NoteComment' });
    t.model.note({ type: 'Note' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
