import { extendType } from 'nexus';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subject();
    t.crud.subjects({
      filtering: {
        code: true,
        name: true,
        description: true,
      },
    });
  },
});
