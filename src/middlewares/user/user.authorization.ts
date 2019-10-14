import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
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

  throw new ForbiddenError(__('no_permission'));
};
