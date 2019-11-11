import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Context } from '../types';
import { UserInclude } from '@generated/photon';

interface JWToken {
  userID: string;
  iat?: number;
  exp?: number;
}

export const validateJWToken = (token: string): JWToken =>
  verify(token.replace('Bearer ', '').replace(/"/g, ''), process.env.APP_SECRET) as JWToken;

export const getUserID = (context: Context) => {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const verifiedToken = validateJWToken(Authorization);
    return verifiedToken && verifiedToken.userID;
  }
};

export const getCurrentUser = async (ctx: Context, include: UserInclude) => {
  return await ctx.photon.users.findOne({ where: { id: getUserID(ctx) }, include });
};

export const generateJWToken = (userID: string, options = {}) =>
  sign({ userID }, process.env.APP_SECRET, options);

export const hashPassword = async (password: string) => await hash(password, 10);

export const comparePasswords = async (password: string, userPassword: string) =>
  await compare(password, userPassword);
