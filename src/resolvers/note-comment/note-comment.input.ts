import { inputObjectType } from 'nexus';

export const CreateNoteCommentInput = inputObjectType({
  name: 'CreateNoteCommentInput',
  description: 'Input of create note comment',
  definition(t) {
    t.string('name', { required: true });
    t.string('content', { required: true });
    t.field('author', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateNoteCommentInput = inputObjectType({
  name: 'UpdateNoteCommentInput',
  description: 'Input of update note comment',
  definition(t) {
    t.string('content');
  },
});
