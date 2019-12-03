import { extendType } from 'nexus';

export const MajorQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.majors();
  },
});
