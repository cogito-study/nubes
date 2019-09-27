import { extendType } from 'nexus';

export const SubjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSubject({ alias: 'createSubject' });
    t.crud.updateOneSubject({ alias: 'updateSubject' });
    t.crud.deleteOneSubject({ alias: 'deleteSubject' });
  },
});
