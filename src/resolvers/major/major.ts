import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Major = objectType({
  name: 'Major',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.faculty({ type: 'Faculty' });
    t.model.subjects({ type: 'Subject' });

    t.field('permissions', {
      type: 'MajorPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.majorPermissions.findMany({
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
