import { extendType, idArg } from '@prisma/nexus';
import { getUserID } from '../../utils';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneUser({ alias: 'user' });
    t.crud.findManyUser({
      alias: 'users',
      filtering: {
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        identifier: true,
        phoneNumber: true,
        role: true,
      },
    });

    t.field('me', {
      type: 'User',
      resolve: (_, {}, ctx) => {
        return ctx.photon.users.findOne({ where: { id: getUserID(ctx) } });
      },
    });
  },
});
