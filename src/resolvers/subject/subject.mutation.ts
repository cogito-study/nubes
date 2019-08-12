import { extendType } from '@prisma/nexus';

export const SubjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSubject();
    t.crud.updateOneSubject();
    t.crud.deleteOneSubject();
  },
});
