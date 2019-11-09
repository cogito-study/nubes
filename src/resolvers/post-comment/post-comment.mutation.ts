import { extendType } from 'nexus';
import { CreatePostCommentInput, UpdatePostCommentInput } from './post-comment.input';
import { WhereUniqueInput } from '../input';
import { getUserID } from '../../utils';

export const PostCommentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createPostComment', {
      type: 'PostComment',
      args: { data: CreatePostCommentInput.asArg({ required: true }) },
      resolve: (_, { data: { post, ...rest } }, ctx) => {
        return ctx.photon.postComments.create({
          data: {
            post: { connect: post },
            author: { connect: { id: getUserID(ctx) } },
            ...rest,
          },
        });
      },
    });

    t.field('updatePostComment', {
      type: 'PostComment',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdatePostCommentInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.postComments.update({
          where,
          data,
        });
      },
    });

    t.field('deletePostComment', {
      type: 'PostComment',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.postComments.delete({
          where,
        });
      },
    });
  },
});
