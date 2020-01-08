import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Subject = objectType({
  name: 'Subject',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
    t.model.description();

    t.model.department();
    t.model.informations({ filtering: { deletedAt: true } });
    t.model.language();
    t.model.moderators({ filtering: { deletedAt: true } });
    t.model.notes({ filtering: { deletedAt: true } });
    t.model.posts({ filtering: { deletedAt: true } });
    t.model.students({ filtering: { deletedAt: true } });
    t.model.teachers({ filtering: { deletedAt: true } });

    t.field('permissions', {
      type: 'SubjectPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.subjectPermissions.findMany({
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
