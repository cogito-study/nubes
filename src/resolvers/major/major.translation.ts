import { objectType } from 'nexus';

export const MajorTranslation = objectType({
  name: 'MajorTranslation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.language();
  },
});
