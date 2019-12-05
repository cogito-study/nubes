import { enumType } from 'nexus';

export const TokenType = enumType({
  name: 'TokenType',
  members: ['RESET_PASSWORD', 'ACTIVATION'],
});
