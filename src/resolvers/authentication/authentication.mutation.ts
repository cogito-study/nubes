import { AuthenticationError } from 'apollo-server';
import { __ } from 'i18n';
import { extendType } from 'nexus';
import { comparePasswords, generateJWToken, hashPassword } from '../../utils/authentication';
import { sendEmail } from '../../utils/email';
import { Environment } from '../../utils/environment';
import {
  generateResetPasswordToken,
  generateToken,
  validateActivationToken,
  validateResetPasswordToken,
} from '../../utils/token';
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
        if (user === null || user.deletedAt !== null) {
          throw new AuthenticationError(__('invalid_email_password'));
        }

        if (!user.isActive) {
          throw new AuthenticationError(__('inactive_user_login'));
        }

        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) {
          throw new AuthenticationError(__('invalid_email_password'));
        }

        return {
          token: generateJWToken(user.id),
          user,
        };
      },
    });

    t.field('register', {
      type: 'User',
      args: {
        data: RegisterUserInput.asArg({ required: true }),
      },
      resolve: async (_, { data }, context) => {
        const { email, password, firstName, lastName, preferredLanguage } = data;
        if ((await context.photon.users.findOne({ where: { email } })) !== null)
          throw new AuthenticationError(__('used_email'));

        try {
          const user = await context.photon.users.create({
            data: {
              email,
              firstName,
              lastName,
              password: await hashPassword(password),
              preferredLanguage: { connect: preferredLanguage },
            },
            include: { preferredLanguage: true },
          });

          const activationToken = await context.photon.activationTokens.create({
            data: {
              user: { connect: { id: user.id } },
              token: generateToken(),
            },
          });

          if (activationToken) {
            sendEmail({
              to: email,
              params: {
                firstName,
                lastName,
                link: Environment.activateRegistrationLink(activationToken.token),
              },
              template: 'RegisterActivation',
              preferredLanguage: user.preferredLanguage.code,
            });
          }

          return user;
        } catch (error) {
          throw new AuthenticationError(__('auth_register_error'));
        }
      },
    });

    t.field('activateRegistration', {
      type: 'User',
      args: {
        data: ActivateRegistrationInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, subjects, major } }, context) => {
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        try {
          const user = await context.photon.users.update({
            where: {
              id: activationToken.user.id,
            },
            data: {
              isActive: true,
              studiedSubjects: { connect: subjects },
              major: { connect: major },
            },
          });

          await context.photon.activationTokens.delete({ where: { token } });

          return user;
        } catch {
          throw new AuthenticationError(__('auth_activation_error'));
        }
      },
    });

    t.field('activateInvitation', {
      type: 'Boolean',
      args: {
        data: ActivateInvitationInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, context) => {
        const activationToken = await validateActivationToken({ token, context });
        if (activationToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        try {
          await context.photon.users.update({
            where: {
              id: activationToken.user.id,
            },
            data: {
              isActive: true,
              password: await hashPassword(password),
            },
          });

          await context.photon.activationTokens.delete({ where: { token } });
        } catch {
          throw new AuthenticationError(__('auth_activation_error'));
        }

        return true;
      },
    });

    t.field('validateToken', {
      type: 'Boolean',
      args: {
        data: ValidateTokenInput.asArg(),
      },
      resolve: async (_, { data: { token, type } }, context) => {
        const validatedToken =
          type === 'ACTIVATION'
            ? await validateActivationToken({ token, context })
            : await validateResetPasswordToken({ token, context });

        return validatedToken !== null;
      },
    });

    t.field('forgotPassword', {
      type: 'Boolean',
      args: {
        data: ForgotPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { email } }, context) => {
        const user = await context.photon.users.findOne({
          where: { email },
          include: { preferredLanguage: true },
        });

        const resetPasswordToken = await generateResetPasswordToken({ email, context });

        if (user !== null) {
          const { firstName, lastName, preferredLanguage } = user;

          sendEmail({
            to: email,
            params: {
              firstName,
              lastName,
              link: Environment.resetPasswordLink(resetPasswordToken.token),
            },
            template: 'ForgotPassword',
            preferredLanguage: preferredLanguage.code,
          });
          return true;
        }
        return true;
      },
    });

    t.field('resetPassword', {
      type: 'Boolean',
      args: {
        data: ResetPasswordInput.asArg({ required: true }),
      },
      resolve: async (_, { data: { token, password } }, context) => {
        const resetPasswordToken = await validateResetPasswordToken({ token, context });
        if (resetPasswordToken === null) throw new AuthenticationError(__('invalid_expired_token'));

        try {
          const user = await context.photon.users.update({
            where: {
              email: resetPasswordToken.email,
            },
            data: {
              password: await hashPassword(password),
            },
            include: { preferredLanguage: true },
          });

          await context.photon.resetPasswordTokens.delete({ where: { token } });

          const { email, firstName, lastName, preferredLanguage } = user;
          sendEmail({
            to: email,
            params: { firstName, lastName, link: Environment.claraURL },
            template: 'ChangePassword',
            preferredLanguage: preferredLanguage.code,
          });
        } catch {
          throw new AuthenticationError(__('auth_reset_password_error'));
        }

        return true;
      },
    });
  },
});
