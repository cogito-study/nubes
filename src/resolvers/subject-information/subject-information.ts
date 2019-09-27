import { objectType } from 'nexus';

export const SubjectInformation = objectType({
  name: 'SubjectInformation',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.subtitle();
    t.model.content();

    t.model.subject({ type: 'Subject' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
