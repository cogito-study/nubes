import { objectType } from 'nexus';

export const PostPermission = objectType({
  name: 'PostPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object({ type: 'Post' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
