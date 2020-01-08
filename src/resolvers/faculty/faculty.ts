import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Faculty = objectType({
  name: 'Faculty',
  definition(t) {
    t.model.id();
    t.model.name();

    t.model.institute();
    t.model.majors({ filtering: { deletedAt: true } });

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
