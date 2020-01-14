import { objectType } from 'nexus';

export const InstituteTranslation = objectType({
  name: 'InstituteTranslation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.language();
  },
});
