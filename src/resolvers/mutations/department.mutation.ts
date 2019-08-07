import { extendType } from '@prisma/nexus';

export const DepartmentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneDepartment();
    t.crud.updateOneDepartment();
    t.crud.deleteOneDepartment();
  },
});
