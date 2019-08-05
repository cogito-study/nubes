import { objectType } from '@prisma/nexus';

export const TopNoteHighlight = objectType({
  name: 'TopNoteHighlight',
  definition(t) {
    t.model.id();
    t.model.position();

    t.model.note({ type: 'Note' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
