import { Middleware } from '../types';
import { deleteNoteHighlight, updateNoteHighlight } from './note-highlight.authorization';

export const noteHighlightMiddlewares: Middleware = {
  Mutation: {
    updateNoteHighlight,
    deleteNoteHighlight,
  },
  Query: {},
};
