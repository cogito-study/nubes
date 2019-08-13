import { extendType } from '@prisma/nexus';

export const SubjectInformationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneSubjectInformation({ alias: 'subjectInformation' });
    t.crud.findManySubjectInformation({
      alias: 'subjectInformations',
      filtering: {
        title: true,
        subtitle: true,
      },
    });
  },
});
