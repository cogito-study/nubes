import { extendType } from '@prisma/nexus';

export const NoteCommentThreadMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteCommentThread();
    t.crud.updateOneNoteCommentThread();
    t.crud.deleteOneNoteCommentThread();
  },
});
