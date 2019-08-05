import { objectType } from '@prisma/nexus';

export const NoteComment = objectType({
  name: 'NoteComment',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.position();

    t.model.author({ type: 'User' });
    t.model.likes({ type: 'User' });
    t.model.thread({ type: 'NoteCommentThread' });
    t.model.threadReply({ type: 'NoteCommentThread' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
