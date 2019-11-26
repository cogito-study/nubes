import { extendType } from 'nexus';
import { UpdateProfileInput } from './user.input';
import { WhereUniqueInput } from '../input';

//logout
export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateProfile', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateProfileInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.users.update({
          where,
          data,
        });
      },
    });

    t.field('deleteUser', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.users.delete({
          where,
        });
      },
    });
  },
});
