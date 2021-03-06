import { getLocale } from 'i18n';
import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Faculty = objectType({
  name: 'Faculty',
  definition(t) {
    t.model.id();

    t.model.institute();
    t.model.majors({ filtering: { deletedAt: true } });

    t.field('name', {
      type: 'String',
      resolve: async ({ id }, _, context) => {
        const translation = await context.photon.facultyTranslations.findMany({
          where: {
            faculty: { id },
            language: { code: getLocale() },
          },
        });
        if (translation === null || !translation[0]) return '';
        return translation[0].name;
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
