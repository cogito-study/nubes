import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreatePostInput, UpdatePostInput } from './post.input';
import { getUserID } from '../../utils/authentication';

export const PostMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createPost', {
      type: 'Post',
      args: { data: CreatePostInput.asArg({ required: true }) },
      resolve: (_, { data: { subject, ...rest } }, ctx) => {
        return ctx.photon.posts.create({
          data: {
            subject: { connect: subject },
            author: { connect: { id: getUserID(ctx) } },
            ...rest,
          },
        });
      },
    });

    t.field('updatePost', {
      type: 'Post',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdatePostInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.posts.update({
          where,
          data,
        });
      },
    });

    t.field('deletePost', {
      type: 'Post',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.posts.delete({
          where,
        });
      },
    });

    t.field('likePost', {
      type: 'Post',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.posts.update({
          where,
          data: {
            likers: {
              connect: { id: getUserID(ctx) },
            },
          },
        });
      },
    });

    t.field('dislikePost', {
      type: 'Post',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.posts.update({
          where,
          data: {
            likers: {
              disconnect: { id: getUserID(ctx) },
            },
          },
        });
      },
    });
  },
});
