import { verify } from 'jsonwebtoken';
import { post, Options, UrlOptions } from 'request';
import { Context } from './types';

interface Token {
  userID: string;
  iat?: number;
  exp?: number;
}

export function getUserID(context: Context): string {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const verifiedToken = verify(token, process.env.APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userID;
  }
}

interface EmailWithName {
  email: string;
  name?: string;
}

export const sendEmail = (
  sender: EmailWithName,
  to: EmailWithName[],
  tags: string[],
  params: object,
  templateId: number,
) => {
  const options: UrlOptions & Options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.SIB_API_KEY,
    },
    body: {
      tags,
      sender,
      to,
      replyTo: { email: 'support@cogito.study' },
      params,
      templateId,
    },
    json: true,
  };

  post(options, (error) => {
    if (error) {
      throw new Error(error);
    }
  });
};
