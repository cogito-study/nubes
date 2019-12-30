import { Middleware } from '../types';
import { deleteSuggestion, updateSuggestion } from './suggestion.authorization';

// TODO: Approve and reject suggestion permissions
export const suggestionMiddlewares: Middleware = {
  Mutation: {
    updateSuggestion,
    deleteSuggestion,
  },
  Query: {},
};
