import { extendType } from 'nexus';

export const NoteCommentThreadQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.noteCommentThread();
  },
});
