import { objectType } from 'nexus';

export const Suggestion = objectType({
  name: 'Suggestion',
  definition(t) {
    t.model.id();
    t.model.approvedAt();
    t.model.rejectedAt();
    t.model.delta();

    t.model.likers({ type: 'User' });
    t.model.note({ type: 'Note' });
    t.model.author({ type: 'User' });
    t.model.approvedBy({ type: 'User' });

    t.field('likesCount', {
      type: 'Int',
      description: 'Number of likes on the suggestion',
      resolve: async ({ id }, args, context) => {
        const likers = await context.photon.suggestions.findOne({ where: { id } }).likers();
        return likers.length;
      },
    });

    t.model.updatedAt();
    t.model.deletedAt();
  },
});
