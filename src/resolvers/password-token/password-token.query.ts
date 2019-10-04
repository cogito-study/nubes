import { extendType } from 'nexus';

export const PasswordTokenQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.passwordtoken({ alias: 'resetPassword' });
    t.crud.passwordtokens({ alias: 'resetPasswords' });
  },
});
