import { Middleware } from '../types';
import { deleteNote, updateNote } from './note.authorization';
import { noteInputValidation } from './note.validation';

export const noteMiddlewares: Middleware = {
  Mutation: {
    updateNote,
    deleteNote,
  },
  Query: {
    note: noteInputValidation,
  },
};
