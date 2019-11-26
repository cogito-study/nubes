import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Institute = objectType({
  name: 'Institute',
  definition(t) {
    t.model.id();
    t.model.name();

    t.model.departments({ type: 'Department' });
    t.model.users({ type: 'User' });

    t.field('permissions', {
      type: 'InstitutePermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.institutePermissions.findMany({
          where: {
            objects: { some: { id } },
            permissions: { some: { users: { some: { id: getUserID(context) } } } },
          },
          select: {
            type: true,
          },
        });
        return await permissions.map((p) => p.type);
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
