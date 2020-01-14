import { getLocale } from 'i18n';
import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Institute = objectType({
  name: 'Institute',
  definition(t) {
    t.model.id();

    t.model.departments({ filtering: { deletedAt: true } });
    t.model.users({ filtering: { deletedAt: true } });
    t.model.faculties({ filtering: { deletedAt: true } });

    t.field('name', {
      type: 'String',
      resolve: async ({ id }, _, context) => {
        const translation = await context.photon.instituteTranslations.findMany({
          where: {
            institute: { id },
            language: { code: getLocale() },
          },
        });
        if (translation === null || !translation[0]) return '';
        return translation[0].name;
      },
    });

    t.field('permissions', {
      type: 'InstitutePermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.institutePermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
            deletedAt: null,
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
