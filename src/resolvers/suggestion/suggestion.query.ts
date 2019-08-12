import { extendType } from '@prisma/nexus';

export const SuggestionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneSuggestion();
    t.crud.findManySuggestion();
  },
});
