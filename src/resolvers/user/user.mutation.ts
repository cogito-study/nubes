import { ApolloError } from 'apollo-server';
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
        if (user === null) throw new Error(`User doesn't exist`);

        const isValidPassword = await comparePasswords(oldPassword, user.password);
        if (!isValidPassword) throw new Error('The old password is not correct');

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
        if (user === null) throw new Error(`User doesn't exist`);

        if ((await ctx.photon.users.findOne({ where: { email } })) !== null)
          throw new ApolloError('Email already in use, please choose another!');

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
        if (user === null) throw new Error(`User doesn't exist`);

        if ((await ctx.photon.languages.findOne({ where: { id: preferredLanguage.id } })) === null)
          throw new ApolloError(`There's no language with this id!`);

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
