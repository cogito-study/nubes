import { extendType } from 'nexus';

export const SuggestionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.suggestion();
  },
});
