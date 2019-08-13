import { extendType } from '@prisma/nexus';

export const DepartmentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneDepartment({ alias: 'department' });
    t.crud.findManyDepartment({
      alias: 'departments',
      filtering: {
        name: true,
        description: true,
      },
    });
  },
});
