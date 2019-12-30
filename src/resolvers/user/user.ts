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

    t.model.role({ type: 'UserRole' });
    t.model.major({ type: 'Major' });
    t.model.notes({ type: 'Note' });
    t.model.noteHighlights({ type: 'NoteHighlight' });
    t.model.suggestions({ type: 'Suggestion' });
    t.model.approvedSuggestions({ type: 'Suggestion' });
    t.model.likedNotes({ type: 'Note' });
    t.model.noteComments({ type: 'NoteComment' });
    t.model.likedPostComments({ type: 'PostComment' });
    t.model.departments({ type: 'Department' });
    t.model.institutes({ type: 'Institute' });
    t.model.preferredLanguage({ type: 'Language' });

    t.field('teachedSubjects', {
      type: 'Subject',
      list: true,
      resolve: async ({ id }, args, context) => {
        return await context.photon.subjects.findMany({
          where: {
            teachers: { some: { id } },
            deletedAt: null,
          },
        });
      },
    });
    t.field('studiedSubjects', {
      type: 'Subject',
      list: true,
      resolve: async ({ id }, args, context) => {
        return await context.photon.subjects.findMany({
          where: {
            students: { some: { id } },
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
