import { objectType } from 'nexus';

export const NoteCommentThreadPermission = objectType({
  name: 'NoteCommentThreadPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
