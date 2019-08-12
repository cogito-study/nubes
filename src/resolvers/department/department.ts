import { objectType } from '@prisma/nexus';

export const Department = objectType({
  name: 'Department',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.description();

    t.model.leader({ type: 'User' });
    t.model.subjects({ type: 'Subject' });
    t.model.institute({ type: 'Institute' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
