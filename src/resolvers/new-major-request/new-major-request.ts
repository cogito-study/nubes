import { objectType } from 'nexus';

export const NewMajorRequest = objectType({
  name: 'NewMajorRequest',
  definition(t) {
    t.model.id();
    t.model.institute();
    t.model.faculty();
    t.model.major();
    t.model.user({ type: 'User' });
  },
});
