import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasUserPermission } from './user.permission';
import { getUserID } from '../../utils';

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

export const users = async (
  resolve: FieldResolver<'Query', 'users'>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  try {
    const user = await context.photon.users.findOne({
      where: { id: getUserID(context) },
      include: {
        role: true,
      },
    });
    if (user.role.type == 'ADMIN') return await resolve(parent, args, context, info);
  } catch {
    throw new ForbiddenError(__('no_permission'));
  }
  throw new ForbiddenError(__('no_permission'));
};
