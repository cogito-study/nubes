import { createInstitute } from './admin.authorization';

export const adminMiddlewares = {
  Mutation: {
    createInstitute,
  },
  Query: {},
};
