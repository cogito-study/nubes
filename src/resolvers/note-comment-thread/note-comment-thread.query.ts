import { extendType } from '@prisma/nexus';

export const NoteCommentThreadQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteCommentThread({ alias: 'noteCommentThread' });
    t.crud.findManyNoteCommentThread({ alias: 'noteCommentThreads' });
  },
});
