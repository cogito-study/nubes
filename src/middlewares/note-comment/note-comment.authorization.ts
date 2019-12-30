import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasNoteCommentPermission } from './note-comment.permission';

export const updateNoteComment = async (
  resolve: FieldResolver<'Mutation', 'updateNoteComment'>,
  parent: {},
  args: {
    where: NexusGenInputs['WhereUniqueInput'];
    data: NexusGenInputs['UpdateNoteCommentInput'];
  },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNoteCommentPermission({
      permission: 'UPDATE_NOTE_COMMENT',
      noteCommentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteNoteComment = async (
  resolve: FieldResolver<'Mutation', 'deleteNoteComment'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNoteCommentPermission({
      permission: 'DELETE_NOTE_COMMENT',
      noteCommentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
