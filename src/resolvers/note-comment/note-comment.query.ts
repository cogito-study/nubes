import { extendType } from '@prisma/nexus';

export const NoteCommentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteComment({ alias: 'noteComment' });
    t.crud.findManyNoteComment({ alias: 'noteComments' });
  },
});
