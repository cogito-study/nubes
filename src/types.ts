/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, User } from './generated/prisma-client';

export interface Context {
  prisma: Prisma;
  request: any;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface FileUploadPayload {
  url: string;
}
