import { objectType } from 'nexus';

export const DepartmentTranslation = objectType({
  name: 'DepartmentTranslation',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.description();
    t.model.language();
  },
});
