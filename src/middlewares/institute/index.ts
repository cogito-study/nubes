import { Middleware } from '../types';
import {
  createDepartment,
  deleteInstitute,
  institutes,
  updateInstitute,
} from './institute.authorization';

export const instituteMiddlewares: Middleware = {
  Mutation: {
    createDepartment,
    updateInstitute,
    deleteInstitute,
  },
  Query: {
    institutes,
  },
};
