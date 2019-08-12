import { extendType } from '@prisma/nexus';

export const InstituteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneInstitute();
    t.crud.updateOneInstitute();
    t.crud.deleteOneInstitute();
  },
});
