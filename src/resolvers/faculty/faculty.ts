import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Faculty = objectType({
  name: 'Faculty',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.institute({ type: 'Institute' });
    t.model.majors({ type: 'Major' });

    t.field('permissions', {
      type: 'FacultyPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.facultyPermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
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
