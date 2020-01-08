import { extendType } from 'nexus';

export const NoteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.note();
  },
});
