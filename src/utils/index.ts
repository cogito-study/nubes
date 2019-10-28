import { UserInclude } from '@generated/photon';
import { verify } from 'jsonwebtoken';
import { Context } from './../types';

interface Token {
  userID: string;
  iat?: number;
  exp?: number;
}

export function getUserID(context: Context) {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '').replace(/"/g, '');
    const verifiedToken = verify(token, process.env.APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userID;
  }
}

export async function getCurrentUser(ctx: Context, include: UserInclude) {
  return await ctx.photon.users.findOne({ where: { id: getUserID(ctx) }, include });
}

export const optionalConnect = (object?: { id: string }) => (object ? { connect: object } : null);

export const catchNotExistError = (err: { message: string }) =>
  err.message.match(/Record Does Not Exist/i) ? null : err;
