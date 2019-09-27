import { objectType } from 'nexus';

export const Language = objectType({
  name: 'Language',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
  },
});
