import { extendType } from '@prisma/nexus';

export const NoteHighlightMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNoteHighlight();
    t.crud.updateOneNoteHighlight();
    t.crud.deleteOneNoteHighlight();
  },
});
