import { verify } from 'jsonwebtoken';
import { Context } from './types';

interface Token {
  userID: string;
  iat?: number;
  exp?: number;
}

export function getUserID(context: Context) {
  const Authorization = context.req.headers.authorization;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, process.env.APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userID;
  }
}
