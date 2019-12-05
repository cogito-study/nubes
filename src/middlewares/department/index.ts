import { Middleware } from '../types';
import { createSubject, deleteDepartment, updateDepartment } from './department.authorization';

export const departmentMiddlewares: Middleware = {
  Mutation: {
    createSubject,
    updateDepartment,
    deleteDepartment,
  },
  Query: {},
};
