import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver } from 'nexus';
import { NexusGenArgTypes } from '../../../generated/nexus-typegen';
import { Context } from '../../types';

export const registerInputValidation = async (
  resolve: FieldResolver<'Mutation', 'register'>,
  parent: {},
  args: NexusGenArgTypes['Mutation']['register'],
  context: Context,
  info: GraphQLResolveInfo,
) => {
  console.log('before', info);
  const result = await resolve(parent, args, context, info);
  console.log('result', result);
  return result;
};
