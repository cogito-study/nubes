import { extendType } from '@prisma/nexus';

export const UserRoleMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneUserRole();
    t.crud.updateOneUserRole();
    t.crud.deleteOneUserRole();
  },
});
