import { extendType } from '@prisma/nexus';

export const NoteCommentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteComment();
    t.crud.findManyNoteComment();
  },
});
