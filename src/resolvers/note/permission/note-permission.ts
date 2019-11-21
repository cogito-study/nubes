import { objectType } from 'nexus';

export const NotePermission = objectType({
  name: 'NotePermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.objects({ type: 'Note' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
