import { extendType } from '@prisma/nexus';

export const NoteHighlightQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteHighlight();
    t.crud.findManyNoteHighlight();
  },
});
