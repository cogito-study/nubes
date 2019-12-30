import { ApolloError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType } from 'nexus';
import { comparePasswords, getCurrentUser, hashPassword } from '../../utils/authentication';
import { WhereUniqueInput } from '../input';
import { ChangeEmailInput, ChangePasswordInput, ChangePreferredLanguageInput } from './user.input';

/**
 * TODO:
 * 1. logout
 * 2. check existing email before updating
 * 3. send email after  changing
 *     - password
 *     - email
 */
export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('changePassword', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: ChangePasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data: { oldPassword, newPassword } }, ctx) => {
        const user = await getCurrentUser(ctx);
        if (user === null) throw new Error(__('user_no_exist'));

        const isValidPassword = await comparePasswords(oldPassword, user.password);
        if (!isValidPassword) throw new Error(__('old_password_validation'));

        return await ctx.photon.users.update({
          where,
          data: { password: await hashPassword(newPassword) },
        });
      },
    });

    t.field('changeEmail', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: ChangeEmailInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data: { email } }, ctx) => {
        const user = await getCurrentUser(ctx);
        if (user === null) throw new Error(__('user_no_exist'));

        if ((await ctx.photon.users.findOne({ where: { email } })) !== null)
          throw new ApolloError(__('used_email'));

        return await ctx.photon.users.update({
          where,
          data: { email },
        });
      },
    });

    t.field('changePreferredLanguage', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: ChangePreferredLanguageInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data: { preferredLanguage } }, ctx) => {
        const user = await getCurrentUser(ctx);
        if (user === null) throw new Error(__('user_no_exist'));

        if ((await ctx.photon.languages.findOne({ where: { id: preferredLanguage.id } })) === null)
          throw new ApolloError(__('invalid_language'));

        return await ctx.photon.users.update({
          where,
          data: { preferredLanguage: { connect: preferredLanguage } },
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
