import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver } from 'nexus';
import { NexusGenArgTypes } from '../../../generated/nexus-typegen';
import { Context } from '../../types';

export const noteInputValidation = async (
  resolve: FieldResolver<'Query', 'note'>,
  parent: {},
  args: NexusGenArgTypes['Query']['note'],
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const result = await resolve(parent, args, context, info);
  return result;
};
