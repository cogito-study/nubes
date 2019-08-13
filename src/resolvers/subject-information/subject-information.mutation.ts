import { extendType } from '@prisma/nexus';

export const SubjectInformationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSubjectInformation({ alias: 'createSubjectInformation' });
    t.crud.updateOneSubjectInformation({ alias: 'updateSubjectInformation' });
    t.crud.deleteOneSubjectInformation({ alias: 'deleteSubjectInformation' });
  },
});
