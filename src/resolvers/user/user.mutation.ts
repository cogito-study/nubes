import { extendType } from 'nexus';
import { comparePasswords, getCurrentUser, hashPassword } from '../../utils/authentication';
import { WhereUniqueInput } from '../input';
import { UpdateProfileInput } from './user.input';

/**
 * 1. change preferred language
 * 2. logout
 * 3. send email after  changing
 *     - password
 *     - email
 */
export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateProfile', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateProfileInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data: { email, oldPassword, newPassword } }, ctx) => {
        const user = await getCurrentUser(ctx);
        if (user === null) throw new Error(`User doesn't exist`);

        if (oldPassword) {
          const isValidPassword = await comparePasswords(oldPassword, user.password);
          if (!isValidPassword) throw new Error('The old password is not correct');

          return await ctx.photon.users.update({
            where,
            data: {
              email,
              password: await hashPassword(newPassword),
            },
          });
        }

        return await ctx.photon.users.update({
          where,
          data: { email },
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
