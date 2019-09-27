import { inputObjectType, FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import * as yup from 'yup';

export const userLoginInputValidator = async (
  resolve: FieldResolver<'Mutation', 'login'>,
  parent: {},
  args: { data: NexusGenInputs['UserLoginInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const schema = yup.object().shape({
    email: yup.string().email(),
  });
  const schemaIsValid = await schema.isValid(args.data);
  if (!schemaIsValid) throw new Error('Invalid email address!');

  return await resolve(parent, args, context, info);
};

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  description: 'Input of login',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});
