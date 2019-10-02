import { updateSubject, createNote, deleteSubject } from './subject.authorization';

export const subjectMiddlewares = {
  Mutation: {
    updateSubject,
    createNote,
    deleteSubject,
  },
  Query: {},
};
