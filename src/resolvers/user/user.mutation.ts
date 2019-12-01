import { extendType } from 'nexus';
import { comparePasswords, getCurrentUser, hashPassword } from '../../utils/authentication';
import { WhereUniqueInput } from '../input';
import { UpdateProfileInput } from './user.input';

/**
 * 1. logout
 * 2. send email after  changing
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
      // eslint-disable-next-line complexity
      resolve: async (
        _,
        { where, data: { email, oldPassword, newPassword, preferredLanguage } },
        ctx,
      ) => {
        const user = await getCurrentUser(ctx);
        if (user === null) throw new Error(`User doesn't exist`);

        const data: {
          email?: string;
          password?: string;
          preferredLanguage?: { connect: { id: string } };
        } = {};

        if (email) data.email = email;

        if (preferredLanguage) data.preferredLanguage = { connect: preferredLanguage };

        if (oldPassword) {
          const isValidPassword = await comparePasswords(oldPassword, user.password);
          if (!isValidPassword) throw new Error('The old password is not correct');
          data.password = await hashPassword(newPassword);
        }

        return await ctx.photon.users.update({
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
