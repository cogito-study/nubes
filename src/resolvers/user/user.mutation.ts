import { extendType } from 'nexus';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserLoginInput, UpdateUserInput } from './user.input';
import { WhereUniqueInput } from '../input';

const generateToken = (userID: string, options = {}) => sign({ userID }, process.env.APP_SECRET, options);

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        data: UserLoginInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email, password } }, ctx) => {
        try {
          const user = await ctx.photon.users.findOne({ where: { email } });

          const isValidPassword = await compare(password, user.password);
          if (!isValidPassword) throw new Error('Invalid email or password');
          if (!user.isActive) throw new Error('Inactive user tried to log in');

          return {
            token: generateToken(user.id),
            user,
          };
        } catch {
          throw new Error('Invalid email or password');
        }
      },
    });

    t.field('updateUser', {
      type: 'User',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateUserInput.asArg({ required: true }),
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
