import { extendType } from '@prisma/nexus';

export const UserRoleQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneUserRole();
    t.crud.findManyUserRole();
  },
});
