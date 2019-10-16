import { extendType } from 'nexus';

export const NoteCommentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notecomment({ alias: 'noteComment' });
  },
});
