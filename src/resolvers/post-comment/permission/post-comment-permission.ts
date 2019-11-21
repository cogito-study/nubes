import { objectType } from 'nexus';

export const PostCommentPermission = objectType({
  name: 'PostCommentPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.objects({ type: 'PostComment' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
