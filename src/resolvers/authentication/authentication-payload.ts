import { objectType } from 'nexus';

export const AuthenticationPayload = objectType({
  name: 'AuthenticationPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});
