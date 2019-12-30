import { Middleware } from '../types';
import { deleteNote, updateNote } from './note.authorization';

export const noteMiddlewares: Middleware = {
  Mutation: {
    updateNote,
    deleteNote,
  },
};
