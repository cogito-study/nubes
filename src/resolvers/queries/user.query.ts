import { extendType } from '@prisma/nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneUser();
    t.crud.findManyUser();
  },
});
