import { extendType } from 'nexus';

export const AdminQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.departments();
    t.crud.subjects();
    t.crud.institutes();
  },
});
