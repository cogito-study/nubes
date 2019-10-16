import { extendType } from 'nexus';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subject();
  },
});
