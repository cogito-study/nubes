import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Subject = objectType({
  name: 'Subject',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
    t.model.description();

    t.model.department({ type: 'Department' });
    t.model.teachers({ type: 'User' });
    t.model.students({ type: 'User' });
    t.model.informations({ type: 'SubjectInformation' });
    t.model.notes({ type: 'Note' });
    t.model.posts({ type: 'Post', ordering: { createdAt: true } });
    t.model.language({ type: 'Language' });

    t.field('permissions', {
      type: 'SubjectPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.subjectPermissions.findMany({
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
