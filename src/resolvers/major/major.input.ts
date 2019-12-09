import { inputObjectType } from 'nexus';

export const CreateMajorInput = inputObjectType({
  name: 'CreateMajorInput',
  description: 'Input of create major',
  definition(t) {
    t.string('name', { required: true });
    t.field('faculty', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateMajorInput = inputObjectType({
  name: 'UpdateMajorInput',
  description: 'Input of update major',
  definition(t) {
    t.string('name');
    t.field('faculty', { type: 'ConnectRelation' });
    t.field('subjects', { type: 'ConnectOrDisconnectRelation' });
  },
});

export const MajorByTokenInput = inputObjectType({
  name: 'MajorByTokenInput',
  definition(t) {
    t.string('token', { required: true });
  },
});
