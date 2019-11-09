import { objectType } from 'nexus';

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.author({ type: 'User' });
    t.model.likers({ type: 'User' });
    t.model.subject({ type: 'Subject' });
    t.model.comments({ type: 'PostComment' });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the post',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.posts.findOne({ where: { id } }).likers();
        return likers.length;
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
