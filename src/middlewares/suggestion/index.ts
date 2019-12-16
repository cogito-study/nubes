import { Middleware } from '../types';
import { deleteSuggestion, updateSuggestion } from './suggestion.authorization';

export const suggestionMiddlewares: Middleware = {
  Mutation: {
    updateSuggestion,
    deleteSuggestion,
  },
  Query: {},
};
