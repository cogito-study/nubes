import { ApolloError } from 'apollo-server';
import { addMinutes, differenceInMinutes, isBefore } from 'date-fns';
import { __n } from 'i18n';
import { v4 as uuid } from 'uuid';
import { NexusGenEnums } from '../../generated/nexus-typegen';
import { Context } from '../types';

type TokenType = NexusGenEnums['TokenType'];

const tokenExpirationMinutes: Record<TokenType, number> = {
  RESET_PASSWORD: 3 * 60 * 24, // 3 days
  ACTIVATION: 7 * 60 * 24, // 7 days
};

export const generateToken = () => uuid();

const hasTokenExpired = ({
  token,
  type,
}: {
  token: { createdAt: Date };
  type: TokenType;
}): boolean => {
  const createdAt = new Date();
  const expiredAt = addMinutes(token.createdAt, tokenExpirationMinutes[type]);

  return isBefore(expiredAt, createdAt);
};

const checkTokenGenerationFrequency = (token: { createdAt: Date }) => {
  const createdAt = new Date();
  const maxFrequency = 5;
  const canCreateAt = addMinutes(token.createdAt, maxFrequency);
  if (isBefore(createdAt, canCreateAt)) {
    throw new ApolloError(__n('wait_%s_minutes', differenceInMinutes(canCreateAt, createdAt) + 1));
  }
};

type ValidateTokenOptions = {
  token: string;
  context: Context;
};

export const validateResetPasswordToken = async ({ token, context }: ValidateTokenOptions) => {
  const resetPasswordToken = await context.photon.resetPasswordTokens.findOne({ where: { token } });
  if (resetPasswordToken === null) return null;

  return hasTokenExpired({ token: resetPasswordToken, type: 'RESET_PASSWORD' })
    ? null
    : resetPasswordToken;
};

export const validateActivationToken = async ({ token, context }: ValidateTokenOptions) => {
  const activationToken = await context.photon.activationTokens.findOne({
    where: { token },
    include: { user: true },
  });
  if (activationToken === null) return null;

  return hasTokenExpired({ token: activationToken, type: 'ACTIVATION' }) ? null : activationToken;
};

type GenerateResetPasswordTokenOptions = {
  email: string;
  context: Context;
};

export const generateResetPasswordToken = async ({
  email,
  context,
}: GenerateResetPasswordTokenOptions) => {
  const token = await context.photon.resetPasswordTokens.findOne({ where: { email } });
  if (token === null) {
    return await context.photon.resetPasswordTokens.create({
      data: { email, token: generateToken() },
    });
  }

  checkTokenGenerationFrequency(token);
  await context.photon.resetPasswordTokens.update({
    where: { email },
    data: { createdAt: new Date() },
  });
  return token;
};
