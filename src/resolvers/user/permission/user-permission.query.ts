import { extendType } from 'nexus';

export const UserPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.userpermissions({ alias: 'userPermissions' });
  },
});
