import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasSuggestionPermission } from './suggestion.permission';

export const updateSuggestion = async (
  resolve: FieldResolver<'Mutation', 'updateSuggestion'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateSuggestionInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSuggestionPermission({
      permission: 'UPDATE_SUGGESTION',
      suggestionID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};

export const deleteSuggestion = async (
  resolve: FieldResolver<'Mutation', 'deleteSuggestion'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSuggestionPermission({
      permission: 'DELETE_SUGGESTION',
      suggestionID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};
