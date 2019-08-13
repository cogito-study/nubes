import { extendType } from '@prisma/nexus';

export const NoteHighlightQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNoteHighlight({ alias: 'noteHighlight' });
    t.crud.findManyNoteHighlight({ alias: 'noteHighlights' });
  },
});
