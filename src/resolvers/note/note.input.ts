import { FieldResolver, inputObjectType } from '@prisma/nexus';
import { GraphQLResolveInfo } from 'graphql';
import { NexusGenArgTypes } from '../../../generated/nexus-typegen';
import { Context } from '../../types';

export const noteInputValidator = async (
  resolve: FieldResolver<'Query', 'note'>,
  parent: {},
  args: NexusGenArgTypes['Query']['note'],
  context: Context,
  info: GraphQLResolveInfo,
) => {
  console.log('before', info);
  const result = await resolve(parent, args, context, info);
  console.log('result', result);
  return result;
};
