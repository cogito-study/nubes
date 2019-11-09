import { objectType } from 'nexus';

export const PostComment = objectType({
  name: 'PostComment',
  definition(t) {
    t.model.id();
    t.model.content();

    t.model.author({ type: 'User' });
    t.model.post({ type: 'Post' });
    t.model.likers({ type: 'User' });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the postComment',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.postComments.findOne({ where: { id } }).likers();
        return likers.length;
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
