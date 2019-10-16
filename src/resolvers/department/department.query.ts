import { extendType } from 'nexus';

export const DepartmentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.department();
  },
});
