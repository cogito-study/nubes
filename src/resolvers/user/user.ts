import { objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.profilePictureURL();
    t.model.phoneNumber();
    t.model.identifier();

    t.model.notes({ type: 'Note' });
    t.model.noteHighlights({ type: 'NoteHighlight' });
    t.model.suggestions({ type: 'Suggestion' });
    t.model.approvedSuggestions({ type: 'Suggestion' });
    t.model.teachedSubjects({ type: 'Subject' });
    t.model.studiedSubjects({ type: 'Subject' });
    t.model.likedNotes({ type: 'Note' });
    t.model.comments({ type: 'NoteComment' });
    t.model.likedComments({ type: 'NoteComment' });
    t.model.passwordToken({ type: 'PasswordToken' });
    t.model.departments({ type: 'Department' });
    t.model.institutes({ type: 'Institute' });
    t.model.preferredLanguage({ type: 'Language' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
