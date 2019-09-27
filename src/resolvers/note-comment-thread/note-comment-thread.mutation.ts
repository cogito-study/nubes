import { extendType } from 'nexus';

export const NoteCommentThreadMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteCommentThread({ alias: 'createNoteCommentThread' });
    t.crud.updateOneNoteCommentThread({ alias: 'updateNoteCommentThread' });
    t.crud.deleteOneNoteCommentThread({ alias: 'deleteNoteCommentThread' });
  },
});
