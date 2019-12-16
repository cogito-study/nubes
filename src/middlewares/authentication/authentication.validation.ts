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
  const result = await resolve(parent, args, context, info);
  return result;
};
