import {
  createDepartment,
  updateInstitute,
  deleteInstitute,
  institutes,
} from './institute.authorization';

export const instituteMiddlewares = {
  Mutation: {
    createDepartment,
    updateInstitute,
    deleteInstitute,
  },
  Query: {
    institutes,
  },
};
