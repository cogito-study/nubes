import { AuthenticationError } from 'apollo-server';
import { extendType } from 'nexus';
import { comparePasswords, generateJWToken, hashPassword } from '../../utils/authentication';
import { EmailTemplateType, sendEmail } from '../../utils/email';
import { Environment } from '../../utils/environment';
import { generateResetPasswordToken, generateToken, validateToken } from '../../utils/token';
import {
  ActivateInvitationInput,
  ActivateRegistrationInput,
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  ValidateTokenInput,
} from './authentication.input';

export const AuthenticationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('login', {
      type: 'AuthenticationPayload',
      args: {
        data: LoginUserInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email, password } }, context) => {
        const user = await context.photon.users.findOne({ where: { email } });
        if (user === null) throw new AuthenticationError('Invalid email or password');

        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) throw new AuthenticationError('Invalid email or password');
        if (!user.isActive) throw new AuthenticationError('Inactive user tried to log in');

        return {
          token: generateJWToken(user.id),
          user,
        };
      },
    });

    t.field('register', {
      type: 'Boolean',
      args: {
        data: RegisterUserInput.asArg({ required: true }),
      },
      resolve: async (_, { data }, context) => {
        const { email, password, firstName, lastName, preferredLanguage } = data;
        if ((await context.photon.users.findOne({ where: { email } })) !== null)
          throw new AuthenticationError('User already registered!');

        try {
          const user = await context.photon.users.create({
            data: {
              email,
              firstName,
              lastName,
              password: await hashPassword(password),
              preferredLanguage: { connect: preferredLanguage },
            },
          });

          const activationToken = await context.photon.activationTokens.create({
            data: {
              user: { connect: { id: user.id } },
              token: generateToken(),
            },
          });

          if (activationToken) {
            sendEmail({
              to: { email: user.email, name: user.firstName },
              tags: ['Welcome'],
              params: { link: Environment.activateRegistrationLink(activationToken.token) },
              template: EmailTemplateType.RegisterActivation,
            });
          }

          return true;
        } catch (error) {
          throw new AuthenticationError('Unable to create user');
        }
      },
    });

    t.field('activateRegistration', {
      type: 'Boolean',
      args: {
        data: ActivateRegistrationInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, subjectIDs } }, context) => {
        const tokenValidation = await validateToken({ token, type: 'ACTIVATION', context });
        if (tokenValidation === null) throw new AuthenticationError('Invalid or expired token');

        if (tokenValidation.type === 'ACTIVATION') {
          try {
            const subjectConnectIDs = subjectIDs.map((id) => ({ id }));
            await context.photon.users.update({
              where: {
                id: tokenValidation.activationToken.user.id,
              },
              data: {
                isActive: true,
                studiedSubjects: { connect: subjectConnectIDs },
              },
            });

            await context.photon.activationTokens.delete({ where: { token } });
          } catch {
            throw new AuthenticationError('Error happened while activating invitation');
          }

          return true;
        }

        return false;
      },
    });

    t.field('activateInvitation', {
      type: 'Boolean',
      args: {
        data: ActivateInvitationInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, context) => {
        const tokenValidation = await validateToken({ token, type: 'ACTIVATION', context });
        if (tokenValidation === null) throw new AuthenticationError('Invalid or expired token');

        if (tokenValidation.type === 'ACTIVATION') {
          try {
            await context.photon.users.update({
              where: {
                id: tokenValidation.activationToken.user.id,
              },
              data: {
                isActive: true,
                password: await hashPassword(password),
              },
            });

            await context.photon.activationTokens.delete({ where: { token } });
          } catch {
            throw new AuthenticationError('Error happened while activating invitation');
          }

          return true;
        }

        return false;
      },
    });

    t.field('validateToken', {
      type: 'Boolean',
      args: {
        data: ValidateTokenInput.asArg(),
      },
      resolve: async (_, { data: { token, type } }, context) => {
        const validatedToken = await validateToken({ token, type, context });
        return validatedToken !== null;
      },
    });

    t.field('forgotPassword', {
      type: 'Boolean',
      args: {
        data: ForgotPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email } }, context) => {
        const user = await context.photon.users.findOne({ where: { email } });
        if (user !== null) {
          const resetPasswordToken = await generateResetPasswordToken({ email, context });

          sendEmail({
            to: { email: user.email, name: user.firstName },
            tags: ['Reset Password'],
            params: { link: Environment.resetPasswordLink(resetPasswordToken.token) },
            template: EmailTemplateType.StudentForgotPassword,
          });
          return true;
        }
        return false;
      },
    });

    t.field('resetPassword', {
      type: 'Boolean',
      args: {
        data: ResetPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, context) => {
        const tokenValidation = await validateToken({ token, type: 'RESET_PASSWORD', context });
        if (tokenValidation === null) throw new AuthenticationError('Invalid or expired token');

        if (tokenValidation.type === 'RESET_PASSWORD') {
          try {
            await context.photon.users.update({
              where: {
                email: tokenValidation.resetPasswordToken.email,
              },
              data: {
                password: await hashPassword(password),
              },
            });

            await context.photon.resetPasswordTokens.delete({ where: { token } });
          } catch {
            throw new AuthenticationError('Error while trying to reset password');
          }

          return true;
        }

        return false;
      },
    });
  },
});
