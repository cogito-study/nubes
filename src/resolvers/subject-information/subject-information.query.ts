import { extendType } from 'nexus';

export const SubjectInformationQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subjectinformation({ alias: 'subjectInformation' });
    t.crud.subjectinformations({
      alias: 'subjectInformations',
      filtering: {
        title: true,
        subtitle: true,
      },
    });
  },
});
