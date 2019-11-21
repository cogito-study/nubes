import { extendType } from 'nexus';

export const SubjectInformationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subjectInformation();
  },
});
