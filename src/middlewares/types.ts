import { NexusGenFieldTypes } from '../../generated/nexus-typegen';

type MutationKeys = keyof NexusGenFieldTypes['Mutation'];
type MutationFields = Partial<Record<MutationKeys, any>>;

type QueryKeys = keyof NexusGenFieldTypes['Query'];
type QueryFields = Partial<Record<QueryKeys, any>>;

type SubscriptionKeys = keyof NexusGenFieldTypes['Subscription'];
type SubscriptionFields = Partial<Record<SubscriptionKeys, any>>;

export type Middleware = {
  Mutation?: MutationFields;
  Query?: QueryFields;
  Subscription?: SubscriptionFields;
};
