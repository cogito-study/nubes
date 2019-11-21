import { objectType } from 'nexus';

export const SubjectPermission = objectType({
  name: 'SubjectPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.objects({ type: 'Subject' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
