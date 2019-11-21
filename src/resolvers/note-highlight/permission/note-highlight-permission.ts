import { objectType } from 'nexus';

export const NoteHighlightPermission = objectType({
  name: 'NoteHighlightPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.objects({ type: 'NoteHighlight' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
