import { updateNoteHighlight, deleteNoteHighlight } from './note-highlight.authorization';

export const noteHighlightMiddlewares = {
  Mutation: {
    updateNoteHighlight,
    deleteNoteHighlight,
  },
  Query: {},
};
