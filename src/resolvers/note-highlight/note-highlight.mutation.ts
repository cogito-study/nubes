import { extendType } from '@prisma/nexus';

export const NoteHighlightMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteHighlight({ alias: 'createNoteHighlight' });
    t.crud.updateOneNoteHighlight({ alias: 'updateNoteHighlight' });
    t.crud.deleteOneNoteHighlight({ alias: 'deleteNoteHighlight' });
  },
});
