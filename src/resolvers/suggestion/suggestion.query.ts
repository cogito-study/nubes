import { extendType } from 'nexus';
import { SuggestionsInput } from '.';
import { isActiveSuggestion } from './utils/is-active';

export const SuggestionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.suggestion();
    t.field('activeSuggestions', {
      type: 'Suggestion',
      list: true,
      args: { where: SuggestionsInput.asArg({ required: true }) },
      resolve: async (_, { where: { noteID } }, ctx) => {
        const suggestions = await ctx.photon.suggestions.findMany({
          where: {
            note: {
              id: noteID,
            },
          },
        });

        return suggestions.filter(isActiveSuggestion);
      },
    });
  },
});
