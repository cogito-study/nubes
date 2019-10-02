import { extendType } from 'nexus';

export const InstitutePermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.institutepermissions({ alias: 'institutePermissions' });
  },
});
