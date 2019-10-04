import { inputObjectType } from 'nexus';

export const CreateSubjectInformationInput = inputObjectType({
  name: 'CreateSubjectInformationInput',
  description: 'Input of create subject information',
  definition(t) {
    t.string('title', { required: true });
    t.string('subtitle');
    t.string('content', { required: true });
    t.field('subject', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateSubjectInformationInput = inputObjectType({
  name: 'UpdateSubjectInformationInput',
  description: 'Input of update subject information',
  definition(t) {
    t.string('title');
    t.string('subtitle');
    t.string('content');
  },
});
