import { Middleware } from '../types';
import { createInstitute } from './admin.authorization';

export const adminMiddlewares: Middleware = {
  Mutation: {
    createInstitute,
  },
  Query: {},
};
