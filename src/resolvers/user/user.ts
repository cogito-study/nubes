import { __ } from 'i18n';
import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.email();
    t.model.password();
    t.model.profilePictureURL();
    t.model.phoneNumber();
    t.model.identifier();
    t.model.position();
    t.field('fullName', {
      type: 'String',
      resolve: async ({ firstName, lastName }) => {
        return __('full_name', { firstName, lastName });
      },
    });

    t.model.approvedSuggestions({ filtering: { deletedAt: true } });
    t.model.departments({ filtering: { deletedAt: true } });
    t.model.institutes({ filtering: { deletedAt: true } });
    t.model.likedNotes({ filtering: { deletedAt: true } });
    t.model.likedPostComments({ filtering: { deletedAt: true } });
    t.model.major();
    t.model.newMajorRequest();
    t.model.noteComments({ filtering: { deletedAt: true } });
    t.model.noteHighlights({ filtering: { deletedAt: true } });
    t.model.notes({ filtering: { deletedAt: true } });
    t.model.preferredLanguage();
    t.model.role();
    t.model.studiedSubjects({ filtering: { deletedAt: true } });
    t.model.suggestions({ filtering: { deletedAt: true } });
    t.model.teachedSubjects({ filtering: { deletedAt: true } });

    t.field('subjects', {
      type: 'Subject',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.subjects.findMany({
          where: {
            OR: [
              { teachers: { some: { id } } },
              { students: { some: { id } } },
              { moderators: { some: { id } } },
            ],
            deletedAt: null,
          },
        });
      },
    });

    t.field('permissions', {
      type: 'UserPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.userPermissions.findMany({
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
