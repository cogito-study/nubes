import { extendType } from '@prisma/nexus';

export const NoteCommentThreadQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteCommentThread();
    t.crud.findManyNoteCommentThread();
  },
});
