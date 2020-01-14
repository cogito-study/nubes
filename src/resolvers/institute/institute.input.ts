import { inputObjectType } from 'nexus';

export const UpdateInstituteInput = inputObjectType({
  name: 'UpdateInstituteInput',
  description: 'Input of update institute',
  definition(t) {
    t.field('departments', { type: 'ConnectOrDisconnectRelation' });
    t.field('faculties', { type: 'ConnectOrDisconnectRelation' });
  },
});
