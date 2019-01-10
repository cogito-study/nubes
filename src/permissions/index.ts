import { rule, shield } from 'graphql-shield';
import { getUserID } from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userID = getUserID(context);
    return Boolean(userID);
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
});
