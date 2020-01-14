import { Middleware } from '../types';
import { sendEmail } from './admin.authorization';

export const adminMiddlewares: Middleware = {
  Mutation: {
    sendEmail,
  },
  Query: {},
};
