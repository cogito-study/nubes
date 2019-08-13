import { extendType } from '@prisma/nexus';

export const SuggestionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneSuggestion({ alias: 'suggestion' });
    t.crud.findManySuggestion({
      alias: 'suggestions',
      filtering: {
        approvedAt: true,
      },
    });
  },
});
