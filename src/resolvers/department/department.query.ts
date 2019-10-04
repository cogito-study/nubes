import { extendType } from 'nexus';

export const DepartmentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.department();
    t.crud.departments({
      filtering: {
        name: true,
        description: true,
      },
    });
  },
});
