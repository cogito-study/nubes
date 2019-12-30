import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Department = objectType({
  name: 'Department',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.description();

    t.model.leader({ type: 'User' });
    t.model.institute({ type: 'Institute' });

    t.field('subjects', {
      type: 'Subject',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.subjects.findMany({
          where: {
            deletedAt: null,
            department: { id },
          },
        });
      },
    });
    t.field('permissions', {
      type: 'DepartmentPermissionType',
      list: true,
      resolve: async ({ id }, _, context) => {
        const permissions = await context.photon.departmentPermissions.findMany({
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
