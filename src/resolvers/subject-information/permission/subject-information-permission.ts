import { objectType } from 'nexus';

export const SubjectInformationPermission = objectType({
  name: 'SubjectInformationPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.object();

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
