import { extendType } from '@prisma/nexus';

export const SubjectInformationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneSubjectInformation();
    t.crud.findManySubjectInformation();
  },
});
