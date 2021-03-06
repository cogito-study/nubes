import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const SubjectInformation = objectType({
  name: 'SubjectInformation',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.subtitle();
    t.model.content();

    t.model.subject();

    t.field('permissions', {
      type: 'SubjectInformationPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.subjectInformationPermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
            deletedAt: null,
          },
          select: {
            type: true,
          },
        });
        return permissions.map((p) => p.type);
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
