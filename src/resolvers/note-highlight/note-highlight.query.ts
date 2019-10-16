import { extendType } from 'nexus';

export const NoteHighlightQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notehighlight({ alias: 'noteHighlight' });
  },
});
