import { Middleware } from '../types';
import { createNote, deleteSubject, updateSubject } from './subject.authorization';

export const subjectMiddlewares: Middleware = {
  Mutation: {
    updateSubject,
    createNote,
    deleteSubject,
  },
  Query: {},
};
