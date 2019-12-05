import { UserInputError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import * as yup from 'yup';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';

export const userLoginInputValidator = async (
  resolve: FieldResolver<'Mutation', 'login'>,
  parent: {},
  args: { data: NexusGenInputs['LoginUserInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const schema = yup.object().shape({
    email: yup.string().email(),
  });
  const schemaIsValid = await schema.isValid(args.data);
  if (!schemaIsValid) throw new UserInputError(__('invalid_email'));

  return await resolve(parent, args, context, info);
};
