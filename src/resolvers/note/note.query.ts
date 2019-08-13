import { extendType } from '@prisma/nexus';

export const NoteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNote({ alias: 'note' });
    t.crud.findManyNote({ alias: 'notes' });
  },
});
