import { updateSuggestion, deleteSuggestion } from './suggestion.authorization';
import { userLoginInputValidator } from '../user/user.validation';

export const suggestionMiddlewares = {
  Mutation: {
    updateSuggestion,
    deleteSuggestion,
    login: userLoginInputValidator,
  },
  Query: {},
};
