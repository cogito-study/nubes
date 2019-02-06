import { Prisma, User } from './generated/prisma-client';

export interface Context {
  prisma: Prisma;
  request: any;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface BulkCreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  userType: any;
}

export interface FileUploadPayload {
  url: string;
}
