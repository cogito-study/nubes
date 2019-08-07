import { extendType } from '@prisma/nexus';

export const SubjectInformationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSubjectInformation();
    t.crud.updateOneSubjectInformation();
    t.crud.deleteOneSubjectInformation();
  },
});
