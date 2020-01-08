import { objectType } from 'nexus';

export const NoteHighlight = objectType({
  name: 'NoteHighlight',
  definition(t) {
    t.model.id();
    t.model.position();

    t.model.user();
    t.model.note();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
