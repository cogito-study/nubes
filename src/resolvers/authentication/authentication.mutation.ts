import { extendType } from 'nexus';
import { catchNotExistError } from '../../utils';
import { comparePasswords, generateJWToken, hashPassword } from '../../utils/authentication';
import { EmailTemplateType, randomFounder, sendEmail } from '../../utils/email';
import { checkTokenExpiration, checkTokenGenerationFrequency, generateToken } from '../../utils/token';
import { ActivateUserInput, ForgotPasswordInput, ResetPasswordInput, UserLoginInput } from './authentication.input';

export const AuthenticationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('login', {
      type: 'AuthenticationPayload',
      args: {
        data: UserLoginInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email, password } }, ctx) => {
        try {
          const user = await ctx.photon.users.findOne({ where: { email } });

          const isValidPassword = await comparePasswords(password, user.password);
          if (!isValidPassword) throw new Error('Invalid email or password');
          if (!user.isActive) throw new Error('Inactive user tried to log in');

          return {
            token: generateJWToken(user.id),
            user,
          };
        } catch {
          throw new Error('Invalid email or password');
        }
      },
    });

    t.field('forgotPassword', {
      type: 'String',
      args: {
        data: ForgotPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email } }, ctx) => {
        const token = generateToken();
        try {
          const passwordToken = await ctx.photon.resetPasswordTokens.findOne({
            where: { email },
          });

          checkTokenGenerationFrequency(passwordToken);

          await ctx.photon.resetPasswordTokens.update({
            where: { email },
            data: { createdAt: new Date() },
          });
        } catch (error) {
          error = catchNotExistError(error);
          if (!error) {
            await ctx.photon.resetPasswordTokens.create({
              data: { email, token },
            });
          } else {
            throw error;
          }
        }

        try {
          const user = await ctx.photon.users.findOne({ where: { email } });

          try {
            sendEmail(
              { email: 'welcome@cogito.study', name: `${randomFounder()} from Cogito` },
              [{ email, name: user.firstName }],
              ['Welcome'],
              { link: `${process.env.MINERVA_URL}/register?token=${token}&id=${user.id}` },
              EmailTemplateType.StudentForgotPassword,
            );
          } catch {
            throw new Error('Failed to send forgot password email!');
          }
          return 'Done';
        } catch {
          return 'Done';
        }
      },
    });

    t.field('activateUser', {
      type: 'AuthenticationPayload',
      args: {
        data: ActivateUserInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, ctx) => {
        try {
          const activationToken = await ctx.photon.activationTokens.findOne({
            where: {
              token,
            },
            include: {
              user: true,
            },
          });

          checkTokenExpiration(activationToken, 'activate');

          const user = await ctx.photon.users.update({
            where: {
              email: activationToken.user.email,
            },
            data: {
              isActive: true,
              password: await hashPassword(password),
            },
          });

          await ctx.photon.activationTokens.delete({
            where: {
              token,
            },
          });

          return {
            token: generateJWToken(user.id),
            user,
          };
        } catch {
          throw new Error('Token not found');
        }
      },
    });

    t.field('resetPassword', {
      type: 'AuthenticationPayload',
      args: {
        data: ResetPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, ctx) => {
        try {
          const resetPasswordToken = await ctx.photon.resetPasswordTokens.findOne({
            where: {
              token,
            },
          });

          checkTokenExpiration(resetPasswordToken, 'resetPassword');

          const user = await ctx.photon.users.update({
            where: {
              email: resetPasswordToken.email,
            },
            data: {
              password: await hashPassword(password),
            },
          });

          await ctx.photon.resetPasswordTokens.delete({
            where: {
              token,
            },
          });

          return {
            token: generateJWToken(user.id),
            user: user,
          };
        } catch (error) {
          throw new Error('Token not found');
        }
      },
    });
  },
});
