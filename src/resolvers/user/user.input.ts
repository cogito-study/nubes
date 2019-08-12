import { inputObjectType, FieldResolver } from '@prisma/nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';

export const userLoginInputValidator = async (
  resolve: FieldResolver<'Mutation', 'login'>,
  parent: {},
  args: { data: NexusGenInputs['UserLoginInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  console.log('before', info);
  const result = await resolve(parent, args, context, info);
  console.log('result', result);
  return result;
};

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  description: 'Input of login',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});
