import { extendType } from 'nexus';

export const NoteCommentThreadQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notecommentthread({ alias: 'noteCommentThread' });
    t.crud.notecommentthreads({ alias: 'noteCommentThreads' });
  },
});
