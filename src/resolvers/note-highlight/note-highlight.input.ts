import { inputObjectType } from 'nexus';

export const CreateNoteHighlightInput = inputObjectType({
  name: 'CreateNoteHighlightInput',
  description: 'Input of create note highlight',
  definition(t) {
    t.string('position', { required: true });
    t.field('user', { type: 'ConnectRelation', required: true });
    t.field('note', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateNoteHighlightInput = inputObjectType({
  name: 'UpdateNoteHighlightInput',
  description: 'Input of update note highlight',
  definition(t) {
    t.string('position');
  },
});
