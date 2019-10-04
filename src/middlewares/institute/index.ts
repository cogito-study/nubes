import { createDepartment, updateInstitute, deleteInstitute } from './institute.authorization';

export const instituteMiddlewares = {
  Mutation: {
    createDepartment,
    updateInstitute,
    deleteInstitute,
  },
  Query: {},
};
