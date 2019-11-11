import { extendType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user({ alias: 'user' });
    t.crud.users({
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
