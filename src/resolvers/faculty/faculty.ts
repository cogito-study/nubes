import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Faculty = objectType({
  name: 'Faculty',
  definition(t) {
    t.model.id();
    t.model.name();

    t.model.institute({ type: 'Institute' });

    t.field('majors', {
      type: 'Major',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.majors.findMany({
          where: {
            faculty: { id },
            deletedAt: null,
          },
        });
      },
    });
    t.field('permissions', {
      type: 'FacultyPermissionType',
      list: true,
      resolve: async ({ id }, _, context) => {
        const permissions = await context.photon.facultyPermissions.findMany({
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
