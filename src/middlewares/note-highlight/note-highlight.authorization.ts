import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasNoteHighlightPermission } from './note-highlight.permission';

export const updateNoteHighlight = async (
  resolve: FieldResolver<'Mutation', 'updateNoteHighlight'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateNoteHighlightInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNoteHighlightPermission({
      permission: 'UPDATE_NOTE_HIGHLIGHT',
      noteHighlightID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};

export const deleteNoteHighlight = async (
  resolve: FieldResolver<'Mutation', 'deleteNoteHighlight'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNoteHighlightPermission({
      permission: 'DELETE_NOTE_HIGHLIGHT',
      noteHighlightID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};
