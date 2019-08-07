import { objectType } from '@prisma/nexus';

export const Suggestion = objectType({
  name: 'Suggestion',
  definition(t) {
    t.model.id();
    t.model.approvedAt();
    t.model.delta();

    t.model.likers({ type: 'User' });
    t.model.note({ type: 'Note' });
    t.model.author({ type: 'User' });
    t.model.approvedBy({ type: 'User' });

    t.model.updatedAt();
    t.model.deletedAt();
  },
});
