import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasNoteCommentThreadPermission } from './note-comment-thread.permission';

export const deleteNoteCommentThread = async (
  resolve: FieldResolver<'Mutation', 'deleteNoteCommentThread'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNoteCommentThreadPermission({
      permission: 'DELETE_NOTE_COMMENT_THREAD',
      noteCommentThreadID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};
