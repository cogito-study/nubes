import { extendType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const PostQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('posts', {
      type: 'Post',
      list: true,
      args: {},
      resolve: async (_, {}, ctx) => {
        const posts = await ctx.photon.posts.findMany({
          orderBy: { createdAt: 'desc' },
          where: {
            subject: {
              OR: [
                {
                  students: {
                    some: { id: getUserID(ctx) },
                  },
                },
                {
                  teachers: {
                    some: { id: getUserID(ctx) },
                  },
                },
                {
                  moderators: {
                    some: { id: getUserID(ctx) },
                  },
                },
              ],
            },
            deletedAt: null,
          },
        });
        return posts;
      },
    });
  },
});
