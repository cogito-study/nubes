import { objectType } from 'nexus';

export const MajorPermission = objectType({
  name: 'MajorPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object({ type: 'Major' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
