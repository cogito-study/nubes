import { extendType } from 'nexus';

export const DepartmentPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.departmentpermissions({ alias: 'departmentPermissions' });
  },
});
