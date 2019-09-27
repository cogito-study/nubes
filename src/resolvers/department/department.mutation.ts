import { extendType } from 'nexus';

export const DepartmentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneDepartment({ alias: 'createDepartment' });
    t.crud.updateOneDepartment({ alias: 'updateDepartment' });
    t.crud.deleteOneDepartment({ alias: 'deleteDepartment' });
  },
});
