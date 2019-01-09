import { MutationResolvers } from '../generated/graphqlgen';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const Mutation: MutationResolvers.Type = {
  ...MutationResolvers.defaultResolvers,
  signup: async (parent, { email, password, role, neptun }, context) => {
    const hashedPassword = await hash(password, 10);
    const user = await context.prisma.createUser({
      email,
      password: hashedPassword,
      neptun,
      role,
    });
    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },
  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    return {
      token: sign({ userId: user.id }, process.env.APP_SECRET),
      user,
    };
  },
};
