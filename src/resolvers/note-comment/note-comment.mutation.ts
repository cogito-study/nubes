import { extendType } from '@prisma/nexus';

export const NoteCommentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteComment();
    t.crud.updateOneNoteComment();
    t.crud.deleteOneNoteComment();
  },
});
