import { extendType } from '@prisma/nexus';

export const SuggestionMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.crud.createOneSuggestion();
    t.crud.updateOneSuggestion();
    t.crud.deleteOneSuggestion();
  },
});
