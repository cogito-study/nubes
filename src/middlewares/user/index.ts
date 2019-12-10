import { Middleware } from '../types';
import {
  changeEmail,
  changePassword,
  changePreferredLanguage,
  updateUser,
  users,
} from './user.authorization';

export const userMiddlewares: Middleware = {
  Mutation: {
    updateUser,
    changeEmail,
    changePassword,
    changePreferredLanguage,
  },
  Query: {
    users,
  },
};
