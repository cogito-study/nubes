import { extendType } from 'nexus';

export const UserRoleMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneUserRole({ alias: 'createUserRole' });
    t.crud.updateOneUserRole({ alias: 'updateUserRole' });
    t.crud.deleteOneUserRole({ alias: 'deleteUserRole' });
  },
});
