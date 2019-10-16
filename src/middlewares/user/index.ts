import { updateUser, users } from './user.authorization';

export const userMiddlewares = {
  Mutation: {
    updateUser,
  },
  Query: {
    users,
  },
};
