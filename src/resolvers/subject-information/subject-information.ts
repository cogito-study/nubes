import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const SubjectInformation = objectType({
  name: 'SubjectInformation',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.subtitle();
    t.model.content();

    t.model.subject({ type: 'Subject' });

    t.field('permissions', {
      type: 'SubjectInformationPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.subjectInformationPermissions.findMany({
          where: {
            objects: { some: { id } },
            permissions: { some: { users: { some: { id: getUserID(context) } } } },
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
