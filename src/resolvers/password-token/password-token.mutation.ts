import { extendType, stringArg } from '@prisma/nexus';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcrypt';

const hashPassword = (password: string) => hash(password, 10);
const checkTokenValid = (token: string) => {
  try {
    verify(token, process.env.APP_SECRET);
    return true;
  } catch {
    return false;
  }
};

export const PasswordTokenMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('resetPassword', {
      type: 'AuthPayload',
      args: {
        token: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { token, password }, ctx) => {
        const passwordToken = await ctx.photon.passwordTokens.findOne({ where: { token } });
        if (passwordToken) {
          checkTokenValid(token);
          const newPassword = await hashPassword(password);
          await ctx.photon.passwordTokens.delete({ where: { token } });
          await ctx.photon.users.update({
            where: { id: passwordToken.user.id },
            data: { password: newPassword, isActive: true },
          });
          return;
        }
        throw new Error('Invalid email or password');
      },
    });

    t.field('sendResetPasswordEmail', {
      type: 'User',
      args: {
        email: stringArg(),
      },
      resolve: async (_, { email }, ctx) => {
        try {
          const passwordToken = await ctx.photon.passwordTokens.findOne({ where: { email } });
        } catch {
          throw new Error(':(');
        }
        if (passwordTokens) {
          const now = new Date();
          const tokenCreated = new Date(passwordTokens.updatedAt);
          const diffMs = now.getTime() - tokenCreated.getTime();
          const diffMins = diffMs / 1000 / 60; // millisecs / secs
          if (diffMins < 2) {
            throw new Error(`Kérlek várj még ${2 - Math.floor(diffMins)} percet`);
          }
        }

        const token = generateToken(email, { expiresIn: '1d' });
        const passwordToken = await ctx.photon.passwordTokens.upsert({ token, email });

        const user = passwordToken.user;
        if (user) {
          const templateID =
            user.role !== 'USER' ? EmailTemplateType.ProfessorForgotPassword : EmailTemplateType.StudentForgotPassword;
          try {
            sendEmail(
              { email: 'welcome@cogito.study', name: `${randomFounder()} a Cogito-tól` },
              [{ email }],
              ['Welcome'],
              { link: `https://cogito.study/reset?token=${token}` },
              templateID,
            );
            info('Password reset email sent!', { email });
            return true;
          } catch (error) {
            error('Failed to send invite email!', { email });
            throw error;
          }
        }
        return true;
      },
    });
  },
});
