import { extendType } from 'nexus';
import { getUserID } from '../../utils';
import { WhereUniqueInput } from '../input';
import { Context } from './../../types';
import { CreateSuggestionInput, UpdateSuggestionInput } from './suggestion.input';
import { publishSuggestionEvent } from './suggestion.subscription';
import { applySuggestion } from './utils/collaboration';

export const SuggestionMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSuggestion', {
      type: 'Suggestion',
      args: { data: CreateSuggestionInput.asArg({ required: true }) },
      resolve: async (_, { data: { note, ...rest } }, ctx) => {
        const creator = { id: getUserID(ctx) };
        const suggestion = await ctx.photon.suggestions.create({
          include: {
            note: true,
          },
          data: {
            author: { connect: creator },
            note: { connect: note },
            ...rest,
          },
        });
        await publishSuggestionEvent('SUGGESTION_CREATE', suggestion, ctx);
        return suggestion;
      },
    });

    t.field('updateSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateSuggestionInput.asArg({ required: true }),
      },
      resolve: async (_, { where, data }, ctx) => {
        const suggestion = await ctx.photon.suggestions.update({
          where,
          data,
          include: { note: true },
        });
        await publishSuggestionEvent('SUGGESTION_UPDATE', suggestion, ctx);
        return suggestion;
      },
    });

    t.field('approveSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: async (_, { where }, ctx: Context) => {
        await applySuggestion(where.id, ctx);
        const suggestion = await ctx.photon.suggestions.findOne({ where, include: { note: true } });
        await publishSuggestionEvent('SUGGESTION_APPROVE', suggestion, ctx);
        return suggestion;
      },
    });

    t.field('rejectSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: async (_, { where }, ctx) => {
        // Here we will need a different implementation
        const suggestion = await ctx.photon.suggestions.update({
          include: {
            note: true,
          },
          where,
          data: { deletedAt: new Date() },
        });
        await publishSuggestionEvent('SUGGESTION_REJECT', suggestion, ctx);
        return suggestion;
      },
    });

    t.field('deleteSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: async (_, { where }, ctx) => {
        const suggestion = await ctx.photon.suggestions.delete({
          where,
        });
        return suggestion;
      },
    });
  },
});
