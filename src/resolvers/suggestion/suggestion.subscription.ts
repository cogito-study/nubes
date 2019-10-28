import { Suggestion } from '@generated/photon';
import { withFilter } from 'apollo-server';
import { extendType } from 'nexus';
import { Context } from './../../types';
import { WhereUniqueInput } from './../input';

type SuggestionEvent = 'SUGGESTION_CREATE' | 'SUGGESTION_UPDATE' | 'SUGGESTION_APPROVE' | 'SUGGESTION_REJECT';

type PayloadName = string;

const payloadToEvent: Record<SuggestionEvent, PayloadName> = {
  SUGGESTION_CREATE: 'createdSuggestion',
  SUGGESTION_UPDATE: 'updatedSuggestion',
  SUGGESTION_APPROVE: 'approvedSuggestion',
  SUGGESTION_REJECT: 'rejectedSuggestion',
};

export const publishSuggestionEvent = async (event: SuggestionEvent, suggestion: Suggestion, ctx: Context) =>
  await ctx.pubsub.publish(event, { [payloadToEvent[event]]: suggestion });

const filteredIterator = (event: SuggestionEvent) => {
  return withFilter(
    (_, {}, ctx) => ctx.pubsub.asyncIterator(event),
    (payload, { where }) => {
      return payload[payloadToEvent[event]].note.id === where.id;
    },
  );
};

export const SuggestionSubscription = extendType({
  type: 'Subscription',
  definition: (t) => {
    t.field('createdSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      // @ts-ignore
      subscribe: filteredIterator('SUGGESTION_CREATE'),
    });
    t.field('updatedSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      // @ts-ignore
      subscribe: filteredIterator('SUGGESTION_UPDATE'),
    });
    t.field('approvedSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      // @ts-ignore
      subscribe: filteredIterator('SUGGESTION_APPROVE'),
    });
    t.field('rejectedSuggestion', {
      type: 'Suggestion',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      // @ts-ignore
      subscribe: filteredIterator('SUGGESTION_REJECT'),
    });
  },
});
