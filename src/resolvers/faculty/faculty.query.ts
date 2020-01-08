import { extendType } from 'nexus';

export const FacultyQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.faculty();
    t.crud.faculties({ filtering: { deletedAt: true } });
  },
});
