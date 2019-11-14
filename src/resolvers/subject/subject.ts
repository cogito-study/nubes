import { objectType } from 'nexus';

export const Subject = objectType({
  name: 'Subject',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
    t.model.description();

    t.model.department({ type: 'Department' });
    t.model.teachers({ type: 'User' });
    t.model.students({ type: 'User' });
    t.model.informations({ type: 'SubjectInformation' });
    t.model.notes({ type: 'Note' });
    t.model.posts({ type: 'Post', ordering: { createdAt: true } });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
