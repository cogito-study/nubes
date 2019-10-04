import { createSubject, updateDepartment, deleteDepartment } from './department.authorization';

export const departmentMiddlewares = {
  Mutation: {
    createSubject,
    updateDepartment,
    deleteDepartment,
  },
  Query: {},
};
