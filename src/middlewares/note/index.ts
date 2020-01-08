import { Middleware } from '../types';
import { createSuggestion, deleteNote, updateNote } from './note.authorization';

export const noteMiddlewares: Middleware = {
  Mutation: {
    createSuggestion,
    updateNote,
    deleteNote,
  },
};
