import { inputObjectType } from 'nexus';

export const UpdateSubjectInput = inputObjectType({
  name: 'UpdateSubjectInput',
  description: 'Input of update subject',
  definition(t) {
    t.string('code');
    t.string('name');
    t.string('description');
    t.field('students', { type: 'ConnectOrDisconnectRelation' });
    t.field('teachers', { type: 'ConnectOrDisconnectRelation' });
    t.field('moderators', { type: 'ConnectOrDisconnectRelation' });
  },
});

export const SubjectWhereUniqueInput = inputObjectType({
  name: 'SubjectWhereUniqueInput',
  definition(t) {
    t.string('id');
    t.string('code');
  },
});
