import { extendType } from 'nexus';
import { CreateSuggestionInput, UpdateSuggestionInput } from './suggestion.input';
import { WhereUniqueInput } from '../input';

export const SuggestionMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSuggestion', {
      type: 'Suggestion',
      args: { data: CreateSuggestionInput.asArg({ required: true }) },
      resolve: (_, { data: { author, note, ...rest } }, ctx) => {
        return ctx.photon.suggestions.create({
          data: {
            author: { connect: author },
            note: { connect: note },
            ...rest,
          },
        });
      },
    });

    t.field('updateSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateSuggestionInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.suggestions.update({
          where,
          data,
        });
      },
    });

    t.field('deleteSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.suggestions.delete({
          where,
        });
      },
    });
  },
});
