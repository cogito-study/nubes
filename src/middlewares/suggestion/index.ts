import { Middleware } from '../types';
import { userLoginInputValidator } from '../user/user.validation';
import { deleteSuggestion, updateSuggestion } from './suggestion.authorization';

export const suggestionMiddlewares: Middleware = {
  Mutation: {
    updateSuggestion,
    deleteSuggestion,
    login: userLoginInputValidator,
  },
  Query: {},
};
