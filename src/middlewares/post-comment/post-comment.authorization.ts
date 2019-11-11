import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasPostCommentPermission } from './post-comment.permission';

export const updatePostComment = async (
  resolve: FieldResolver<'Mutation', 'updatePostComment'>,
  parent: {},
  args: {
    where: NexusGenInputs['WhereUniqueInput'];
    data: NexusGenInputs['UpdatePostCommentInput'];
  },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasPostCommentPermission({
      permission: 'UPDATE_POSTCOMMENT',
      postCommentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deletePostComment = async (
  resolve: FieldResolver<'Mutation', 'deletePostComment'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasPostCommentPermission({
      permission: 'DELETE_POSTCOMMENT',
      postCommentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
