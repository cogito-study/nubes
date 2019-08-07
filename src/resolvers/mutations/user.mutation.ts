import { extendType } from '@prisma/nexus';

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneUser();
    t.crud.deleteOneUser();
  },
});
