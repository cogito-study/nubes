import { extendType } from 'nexus';

export const NoteCommentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteComment({ alias: 'createNoteComment' });
    t.crud.updateOneNoteComment({ alias: 'updateNoteComment' });
    t.crud.deleteOneNoteComment({ alias: 'deleteNoteComment' });
  },
});
