import { objectType } from 'nexus';

export const NoteCommentPermission = objectType({
  name: 'NoteCommentPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
