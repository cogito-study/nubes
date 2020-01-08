import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Institute = objectType({
  name: 'Institute',
  definition(t) {
    t.model.id();
    t.model.name();

    t.model.departments({ filtering: { deletedAt: true } });
    t.model.users({ filtering: { deletedAt: true } });
    t.model.faculties({ filtering: { deletedAt: true } });

    t.field('permissions', {
      type: 'InstitutePermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.institutePermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
            deletedAt: null,
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
