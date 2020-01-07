import { Middleware } from '../types';
import { approveSuggestion, rejectSuggestion } from './suggestion.authorization';

export const suggestionMiddlewares: Middleware = {
  Mutation: {
    approveSuggestion,
    rejectSuggestion,
  },
  Query: {},
};
