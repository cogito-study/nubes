import { inputObjectType } from 'nexus';

export const CreateNoteCommentThreadInput = inputObjectType({
  name: 'CreateNoteCommentThreadInput',
  description: 'Input of create note comment',
  definition(t) {
    t.string('name', { required: true });
    t.string('position', { required: true });
    t.field('comment', { type: 'ConnectRelation', required: true });
    t.field('note', { type: 'ConnectRelation', required: true });
  },
});
