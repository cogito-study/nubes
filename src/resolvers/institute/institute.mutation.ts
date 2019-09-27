import { extendType } from 'nexus';

export const InstituteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneInstitute({ alias: 'createInstitute' });
    t.crud.updateOneInstitute({ alias: 'updateInstitute' });
    t.crud.deleteOneInstitute({ alias: 'deleteInstitute' });
  },
});
