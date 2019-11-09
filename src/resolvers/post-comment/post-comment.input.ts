import { inputObjectType } from 'nexus';

export const CreatePostCommentInput = inputObjectType({
  name: 'CreatePostCommentInput',
  description: 'Input of create post comment',
  definition(t) {
    t.string('name', { required: true });
    t.string('content', { required: true });
    t.field('post', { type: 'ConnectRelation', required: true });
  },
});

export const UpdatePostCommentInput = inputObjectType({
  name: 'UpdatePostCommentInput',
  description: 'Input of update post comment',
  definition(t) {
    t.string('content');
  },
});
