import { objectType } from 'nexus';

export const Institute = objectType({
  name: 'Institute',
  definition(t) {
    t.model.id();
    t.model.name();

    t.model.departments({ type: 'Department' });
    t.model.users({ type: 'User' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
