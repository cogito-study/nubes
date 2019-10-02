import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasUserPermission } from './user.permission';

export const updateUser = async (
  resolve: FieldResolver<'Mutation', 'updateUser'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateUserInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasUserPermission({
      permission: 'UPDATE_USER',
      userID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};
