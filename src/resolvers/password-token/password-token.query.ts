import { extendType } from '@prisma/nexus';

export const PasswordTokenQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOnePasswordToken({ alias: 'resetPassword' });
    t.crud.findManyPasswordToken({ alias: 'resetPasswords' });
  },
});
