import { createNote, deleteSubject, updateSubject } from './subject.authorization';

export const subjectMiddlewares = {
  Mutation: {
    updateSubject,
    createNote,
    deleteSubject,
  },
  Query: {},
};
