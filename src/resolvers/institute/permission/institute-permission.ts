import { objectType } from 'nexus';

export const InstitutePermission = objectType({
  name: 'InstitutePermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object({ type: 'Institute' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
