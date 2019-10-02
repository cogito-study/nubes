import { extendType } from 'nexus';

export const SubjectQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subject();
    t.crud.subjects({
      filtering: {
        id: true,
        code: true,
        name: true,
        description: true,
      },
    });
  },
});
