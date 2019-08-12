import { extendType } from '@prisma/nexus';

export const NoteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneNote();
    t.crud.updateOneNote();
    t.crud.deleteOneNote();
  },
});
