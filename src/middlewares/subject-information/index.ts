import {
  updateSubjectInformation,
  deleteSubjectInformation,
} from './subject-information.authorization';

export const subjectInformationMiddlewares = {
  Mutation: {
    updateSubjectInformation,
    deleteSubjectInformation,
  },
  Query: {},
};
