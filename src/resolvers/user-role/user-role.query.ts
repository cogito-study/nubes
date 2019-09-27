import { extendType } from 'nexus';

export const UserRoleQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.userrole({ alias: 'userRole' });
    t.crud.userroles({
      alias: 'userRoles',
      filtering: {
        name: true,
      },
    });
  },
});
