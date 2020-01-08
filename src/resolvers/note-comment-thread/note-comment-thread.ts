import { objectType } from 'nexus';

export const NoteCommentThread = objectType({
  name: 'NoteCommentThread',
  definition(t) {
    t.model.id();
    t.model.position();

    t.model.comment();
    t.model.replies({ filtering: { deletedAt: true } });
    t.model.note();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
