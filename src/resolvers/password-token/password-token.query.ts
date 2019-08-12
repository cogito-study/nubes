import { extendType } from '@prisma/nexus';

export const PasswordTokenQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOnePasswordToken();
    t.crud.findManyPasswordToken();
  },
});
