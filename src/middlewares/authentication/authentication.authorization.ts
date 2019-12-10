import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { addUserPermission } from '../user/user.permission';

export const register = async (
  resolve: FieldResolver<'Mutation', 'register'>,
  parent: {},
  args: { data: NexusGenInputs['RegisterUserInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const response = await resolve(parent, args, context, info);

  addUserPermission({
    permission: 'UPDATE_PROFILE',
    users: [{ id: await response.id }],
    userID: await response.id,
    context,
  });

  return response;
};
