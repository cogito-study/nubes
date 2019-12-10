import { Middleware } from '../types';
import {
  createNote,
  createPost,
  createSubjectInformation,
  deleteSubject,
  updateSubject,
} from './subject.authorization';

export const subjectMiddlewares: Middleware = {
  Mutation: {
    createNote,
    createPost,
    createSubjectInformation,
    deleteSubject,
    updateSubject,
  },
  Query: {},
};
