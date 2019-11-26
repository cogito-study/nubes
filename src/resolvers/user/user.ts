import { __ } from 'i18n';
import { objectType } from 'nexus';

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
    t.model.notes({ type: 'Note' });
    t.model.noteHighlights({ type: 'NoteHighlight' });
    t.model.suggestions({ type: 'Suggestion' });
    t.model.approvedSuggestions({ type: 'Suggestion' });
    t.model.teachedSubjects({ type: 'Subject' });
    t.model.studiedSubjects({ type: 'Subject' });
    t.model.likedNotes({ type: 'Note' });
    t.model.noteComments({ type: 'NoteComment' });
    t.model.likedPostComments({ type: 'PostComment' });
    t.model.departments({ type: 'Department' });
    t.model.institutes({ type: 'Institute' });
    t.model.preferredLanguage({ type: 'Language' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
