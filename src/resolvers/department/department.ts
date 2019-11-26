import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Department = objectType({
  name: 'Department',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.description();

    t.model.leader({ type: 'User' });
    t.model.subjects({ type: 'Subject' });
    t.model.institute({ type: 'Institute' });

    t.field('permissions', {
      type: 'DepartmentPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.departmentPermissions.findMany({
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
