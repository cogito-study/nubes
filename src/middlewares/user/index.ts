import { Middleware } from '../types';
import { updateUser, users } from './user.authorization';

export const userMiddlewares: Middleware = {
  Mutation: {
    updateUser,
  },
  Query: {
    users,
  },
};
