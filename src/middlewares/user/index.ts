import { Middleware } from '../types';
import {
  changeEmail,
  changePassword,
  changePreferredLanguage,
  updateUser,
  users,
} from './user.authorization';
import { userLoginInputValidator } from './user.validation';

export const userMiddlewares: Middleware = {
  Mutation: {
    updateUser,
    changeEmail,
    changePassword,
    changePreferredLanguage,
    login: userLoginInputValidator,
  },
  Query: {
    users,
  },
};
