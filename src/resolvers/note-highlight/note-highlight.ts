import { objectType } from '@prisma/nexus';

export const NoteHighlight = objectType({
  name: 'NoteHighlight',
  definition(t) {
    t.model.id();
    t.model.position();

    t.model.user({ type: 'User' });
    t.model.note({ type: 'Note' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
