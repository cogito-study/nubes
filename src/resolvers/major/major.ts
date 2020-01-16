import { getLocale } from 'i18n';
import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Major = objectType({
  name: 'Major',
  definition(t) {
    t.model.id();

    t.model.faculty();
    t.model.subjects({ filtering: { deletedAt: true }, ordering: { name: true } });

    t.field('name', {
      type: 'String',
      resolve: async ({ id }, _, context) => {
        const translation = await context.photon.majorTranslations.findMany({
          where: {
            major: { id },
            language: { code: getLocale() },
          },
        });
        if (translation === null || !translation[0]) return '';
        return translation[0].name;
      },
    });

    t.field('permissions', {
      type: 'MajorPermissionType',
      list: true,
      resolve: async ({ id }, _, context) => {
        const permissions = await context.photon.majorPermissions.findMany({
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
