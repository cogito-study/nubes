import { addMinutes, isBefore } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { ApolloError } from 'apollo-server';
import { __, __n } from 'i18n';

type TokenExpirationType = 'resetPassword' | 'activate';

const tokenExpirationMinutes: Record<TokenExpirationType, number> = {
  resetPassword: 3 * 60 * 24,
  activate: 7 * 60 * 24,
};

export const generateToken = () => uuid();

export const checkTokenExpiration = (token: { createdAt: Date }, type: TokenExpirationType) => {
  const createdAt = new Date();
  const expiredAt = addMinutes(token.createdAt, tokenExpirationMinutes[type]);
  if (isBefore(expiredAt, createdAt)) throw new ApolloError(__('token_expired'));
};

export const checkTokenGenerationFrequency = (token: { createdAt: Date }) => {
  const createdAt = new Date();
  const maxFrequency = 5;
  const canCreateAt = addMinutes(token.createdAt, maxFrequency);
  if (isBefore(createdAt, canCreateAt)) {
    throw new ApolloError(__n('wait_%s_minutes', maxFrequency));
  }
};
