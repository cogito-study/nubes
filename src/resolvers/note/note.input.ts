import { FieldResolver, inputObjectType } from '@prisma/nexus';
import { GraphQLResolveInfo } from 'graphql';
import { NexusGenArgTypes } from '../../../generated/nexus-typegen';
import { Context } from '../../types';

export const noteFindOneInputValidator = async (
  resolve: FieldResolver<'Query', 'findOneNote'>,
  parent: {},
  args: NexusGenArgTypes['Query']['findOneNote'],
  context: Context,
  info: GraphQLResolveInfo,
) => {
  console.log('before', info);
  const result = await resolve(parent, args, context, info);
  console.log('result', result);
  return result;
};
