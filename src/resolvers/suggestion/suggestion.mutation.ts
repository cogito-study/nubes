import { extendType } from 'nexus';
import Delta from 'quill-delta';
import { getUserID } from '../../utils/authentication';
import { WhereUniqueInput } from '../input';
import { Context } from './../../types';
import { CreateSuggestionInput, UpdateSuggestionInput } from './suggestion.input';
import { publishSuggestionEvent } from './suggestion.subscription';
import { applySuggestion } from './utils/collaboration';
import { convertDeltaImages } from './utils/image-handler';

export const SuggestionMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSuggestion', {
      type: 'Suggestion',
      args: { data: CreateSuggestionInput.asArg({ required: true }) },
      resolve: async (_, { data: { note, delta } }, ctx) => {
        const deltaWithConvertedImages = JSON.stringify(
          await convertDeltaImages(new Delta(JSON.parse(delta))),
        );
        const creator = { id: getUserID(ctx) };
        const suggestion = await ctx.photon.suggestions.create({
          include: {
            note: true,
            permissions: true,
          },
          data: {
            author: { connect: creator },
            note: { connect: note },
            delta: deltaWithConvertedImages,
          },
        });
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
        await applySuggestion({ suggestionID: where.id, ctx });
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
        const suggestion = await ctx.photon.suggestions.update({
          include: {
            note: true,
          },
          where,
          data: { deletedAt: new Date(), rejectedAt: new Date() },
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
