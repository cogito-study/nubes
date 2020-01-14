import { ApolloError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType, stringArg } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const UserQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.user();
    t.crud.users({
      filtering: {
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        identifier: true,
        phoneNumber: true,
        role: true,
        deletedAt: true,
      },
    });

    t.field('me', {
      type: 'User',
      resolve: (_, {}, ctx) => {
        return ctx.photon.users.findOne({ where: { id: getUserID(ctx) } });
      },
    });

    t.field('userInfo', {
      type: 'User',
      nullable: true,
      args: {
        token: stringArg(),
      },
      resolve: async (_, { token }, ctx) => {
        const activationToken = await ctx.photon.activationTokens.findOne({
          where: { token },
          include: { user: true },
        });
        if (activationToken !== null) return activationToken.user;

        const resetPasswordToken = await ctx.photon.resetPasswordTokens.findOne({
          where: { token },
        });
        if (resetPasswordToken !== null)
          return await ctx.photon.users.findOne({ where: { email: resetPasswordToken.email } });

        throw new ApolloError(__('invalid_token'));
      },
    });
  },
});
