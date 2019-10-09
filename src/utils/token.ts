import { v4 as uuid } from 'uuid';
import { addMinutes, isBefore } from 'date-fns';

type TokenExpirationType = 'resetPassword' | 'activate';

const tokenExpirationMinutes: Record<TokenExpirationType, number> = {
  resetPassword: 3 * 60 * 24,
  activate: 7 * 60 * 24,
};

export const generateToken = () => uuid();

export const checkTokenExpiration = (token: { createdAt: string }, type: TokenExpirationType) => {
  const createdAt = new Date();
  const expiredAt = addMinutes(new Date(token.createdAt), tokenExpirationMinutes[type]);
  if (isBefore(expiredAt, createdAt)) throw new Error('Token expired :(');
};

export const checkTokenGenerationFrequency = (token: { createdAt: string }) => {
  const createdAt = new Date();
  const maxFrequency = 5;
  const canCreateAt = addMinutes(new Date(token.createdAt), maxFrequency);
  if (isBefore(createdAt, canCreateAt)) {
    throw new Error(`Pls wait ${maxFrequency} minutes`);
  }
};
