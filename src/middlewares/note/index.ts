import { updateNote, deleteNote } from './note.authorization';
import { noteInputValidation } from './note.validation';

export const noteMiddlewares = {
  Mutation: {
    updateNote,
    deleteNote,
  },
  Query: {
    note: noteInputValidation,
  },
};
