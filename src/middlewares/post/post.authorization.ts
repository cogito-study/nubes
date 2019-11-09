import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { addPostCommentPermission } from '../post-comment/post-comment.permission';
import { hasPostPermission } from './post.permission';

export const createPostComment = async (
  resolve: FieldResolver<'Mutation', 'createPostComment'>,
  parent: {},
  args: { data: NexusGenInputs['CreatePostCommentInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasPostPermission({
      permission: 'CREATE_POSTCOMMENT',
      postID: args.data.post.id,
      context,
    })
  ) {
    const response = await resolve(parent, args, context, info);

    const postComment = await context.photon.postComments.findOne({
      include: {
        post: true,
        author: true,
      },
      where: {
        id: await response.id,
      },
    });
    const post = await context.photon.posts.findOne({
      include: {
        subject: true,
      },
      where: {
        id: postComment.post.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
      },
      where: {
        id: post.subject.id,
      },
    });
    addPostCommentPermission({
      permission: 'UPDATE_POSTCOMMENT',
      users: [postComment.author],
      postCommentID: postComment.id,
      context,
    });
    addPostCommentPermission({
      permission: 'DELETE_POSTCOMMENT',
      users: [...subject.teachers, postComment.author],
      postCommentID: postComment.id,
      context,
    });
    addPostCommentPermission({
      permission: 'READ_POSTCOMMENT',
      users: [...subject.students, ...subject.teachers],
      postCommentID: postComment.id,
      context,
    });
    return postComment;
  }

  throw new ForbiddenError(__('no_permission'));
};

export const updatePost = async (
  resolve: FieldResolver<'Mutation', 'updatePost'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdatePostInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasPostPermission({
      permission: 'UPDATE_POST',
      postID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deletePost = async (
  resolve: FieldResolver<'Mutation', 'deletePost'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasPostPermission({
      permission: 'DELETE_POST',
      postID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
