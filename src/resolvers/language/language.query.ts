import { extendType } from 'nexus';

export const LanguageQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.language();
    t.crud.languages();
  },
});
