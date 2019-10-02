import { inputObjectType } from 'nexus';

export const CreateNoteInput = inputObjectType({
  name: 'CreateNoteInput',
  description: 'Input of create note',
  definition(t) {
    t.string('name', { required: true });
    t.string('content', { required: true });
    t.string('contentHTML', { required: true });
    t.string('title', { required: true });
    t.int('number', { required: true });
    t.string('description');
    t.field('noteCategory', { type: 'NoteCategoryEnum', required: true });
    t.field('subject', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateNoteInput = inputObjectType({
  name: 'UpdateNoteInput',
  description: 'Input of update note',
  definition(t) {
    t.string('name');
    t.string('content');
    t.string('contentHTML');
    t.string('title');
    t.int('number');
    t.string('description');
    t.field('noteCategory', { type: 'NoteCategoryEnum' });
  },
});
