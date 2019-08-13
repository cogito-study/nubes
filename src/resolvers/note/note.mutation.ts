import { extendType } from '@prisma/nexus';

export const NoteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNote({ alias: 'createNote' });
    t.crud.updateOneNote({ alias: 'updateNote' });
    t.crud.deleteOneNote({ alias: 'deleteNote' });
  },
});
