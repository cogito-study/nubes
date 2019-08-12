import { extendType } from '@prisma/nexus';

export const NoteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneNote();
    t.crud.findManyNote();
  },
});
