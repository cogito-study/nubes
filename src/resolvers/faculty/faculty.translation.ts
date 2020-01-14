import { objectType } from 'nexus';

export const FacultyTranslation = objectType({
  name: 'FacultyTranslation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.language();
  },
});
