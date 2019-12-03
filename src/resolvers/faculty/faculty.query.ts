import { extendType } from 'nexus';

export const FacultyQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.faculties();
  },
});
