import { Middleware } from '../types';
import {
  deleteSubjectInformation,
  updateSubjectInformation,
} from './subject-information.authorization';

export const subjectInformationMiddlewares: Middleware = {
  Mutation: {
    updateSubjectInformation,
    deleteSubjectInformation,
  },
  Query: {},
};
