import { extendType } from 'nexus';

export const InstituteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.institute();
    t.crud.institutes();
  },
});
