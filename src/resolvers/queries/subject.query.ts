import { extendType } from '@prisma/nexus';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneSubject();
    t.crud.findManySubject();
  },
});
