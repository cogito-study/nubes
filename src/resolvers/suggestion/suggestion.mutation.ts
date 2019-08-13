import { extendType } from '@prisma/nexus';

export const SuggestionMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSuggestion({ alias: 'createSuggestion' });
    t.crud.updateOneSuggestion({ alias: 'updateSuggestion' });
    t.crud.deleteOneSuggestion({ alias: 'deleteSuggestion' });
  },
});
