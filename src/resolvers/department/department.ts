import { getLocale } from 'i18n';
import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Department = objectType({
  name: 'Department',
  definition(t) {
    t.model.id();
    t.model.leader();
    t.model.institute();
    t.model.subjects({ filtering: { deletedAt: true } });

    t.field('name', {
      type: 'String',
      resolve: async ({ id }, _, context) => {
        const translation = await context.photon.departmentTranslations.findMany({
          where: {
            department: { id },
            language: { code: getLocale() },
          },
        });
        if (translation === null || !translation[0]) return '';
        return translation[0].name;
      },
    });

    t.field('description', {
      type: 'String',
      resolve: async ({ id }, _, context) => {
        const translation = await context.photon.departmentTranslations.findMany({
          where: {
            department: { id },
            language: { code: getLocale() },
          },
        });
        if (translation === null || !translation[0]) return '';
        return translation[0].description;
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
