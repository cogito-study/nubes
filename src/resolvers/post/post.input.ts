import { inputObjectType } from 'nexus';

export const CreatePostInput = inputObjectType({
  name: 'CreatePostInput',
  description: 'Input of create post',
  definition(t) {
    t.string('content', { required: true });
    t.field('subject', { type: 'ConnectRelation', required: true });
  },
});

export const UpdatePostInput = inputObjectType({
  name: 'UpdatePostInput',
  description: 'Input of update post',
  definition(t) {
    t.string('content');
  },
});
