import { SubscriptionResolvers } from '../generated/graphqlgen';

export const Subscription: SubscriptionResolvers.Type = {
  ...SubscriptionResolvers.defaultResolvers,
  comments: {
    subscribe: (parent, args, context, info) => {
      return context.prisma.$subscribe.comment({
        mutation_in: ['CREATED', 'DELETED'],
      });
    },
  },
};
