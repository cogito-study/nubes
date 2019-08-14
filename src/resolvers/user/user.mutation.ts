import { extendType } from '@prisma/nexus';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserLoginInput } from './user.input';

const generateToken = (userID: string, options = {}) => sign({ userID }, process.env.APP_SECRET, options);

export const UserMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('login', {
      type: 'AuthPayload',
      args: {
        data: UserLoginInput.asArg({ required: true }),
      },
      resolve: async (parent, { data: { email, password } }, ctx) => {
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
  },
});
