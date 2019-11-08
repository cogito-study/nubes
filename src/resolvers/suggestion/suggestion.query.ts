import { extendType } from 'nexus';
import { SuggestionsInput } from './suggestion.input';

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
            AND: {
              note: {
                id: noteID,
              },
              // Fix when this gets solved https://github.com/prisma-labs/nexus-prisma/issues/515
              // @ts-ignore
              isActive: true,
            },
          },
        });
        return suggestions;
      },
    });
  },
});
