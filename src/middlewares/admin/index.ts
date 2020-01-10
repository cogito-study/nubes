import { Middleware } from '../types';
import { createInstitute, sendEmail } from './admin.authorization';

export const adminMiddlewares: Middleware = {
  Mutation: {
    createInstitute,
    sendEmail,
  },
  Query: {},
};
