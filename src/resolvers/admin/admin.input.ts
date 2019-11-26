import { inputObjectType } from 'nexus';

export const CreateUserInput = inputObjectType({
  name: 'CreateUserInput',
  description: 'Input of create user',
  definition(t) {
    t.string('firstName', { required: true });
    t.string('lastName', { required: true });
    t.string('identifier', { required: true });
    t.string('email', { required: true });
    t.string('role', { required: true });
  },
});
export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  description: 'Input of update user',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
    t.string('identifier');
    t.string('email');
    t.string('position');
    t.field('studiedSubjects', { type: 'String', list: true });
  },
});

export const CreateSubjectInput = inputObjectType({
  name: 'CreateSubjectInput',
  description: 'Input of create subject',
  definition(t) {
    t.string('code', { required: true });
    t.string('name', { required: true });
    t.string('description', { required: true });
    t.field('department', { type: 'ConnectRelation', required: true });
    t.field('language', { type: 'ConnectRelation', required: true });
  },
});

export const CreateDepartmentInput = inputObjectType({
  name: 'CreateDepartmentInput',
  description: 'Input of create department',
  definition(t) {
    t.string('name', { required: true });
    t.string('description', { required: true });
    t.field('institute', { required: true, type: 'ConnectRelation' });
    t.field('leader', { required: true, type: 'ConnectRelation' });
  },
});

export const SendActivationEmailsInput = inputObjectType({
  name: 'SendActivationEmailsInput',
  description: 'Input of activation emails',
  definition(t) {
    t.field('ids', { required: true, list: true, type: 'String' });
  },
});
