import { extendType } from '@prisma/nexus';

export const DepartmentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneDepartment();
    t.crud.findManyDepartment();
  },
});
