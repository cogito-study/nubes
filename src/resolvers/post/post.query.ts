import { extendType } from 'nexus';
import { getUserID } from '../../utils';

export const PostQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('posts', {
      type: 'Post',
      list: true,
      args: {},
      resolve: async (_, {}, ctx) => {
        const posts = await ctx.photon.posts.findMany({
          where: {
            subject: {
              students: {
                some: { id: getUserID(ctx) },
              },
            },
          },
        });
        return posts;
      },
    });
  },
});
