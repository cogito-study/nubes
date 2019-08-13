import { extendType, idArg } from '@prisma/nexus';
import { getUserID } from '../../utils';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneUser({ alias: 'user' });
    t.crud.findManyUser({ alias: 'users' });

    t.field('me', {
      type: 'User',
      resolve: (_, {}, ctx) => {
        return ctx.photon.users.findOne({ where: { id: getUserID(ctx) } });
      },
    });
  },
});
