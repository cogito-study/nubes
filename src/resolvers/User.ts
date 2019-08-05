import { objectType } from '@prisma/nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.password();
    t.model.profilePictureURL();
    t.model.firstName();
    t.model.lastName();
    t.model.phoneNumber();
    t.model.identifier();

    t.model.role({ type: 'UserRole' });
    t.model.notes({ type: 'Note' });
    t.model.noteHighlights({ type: 'NoteHighlight' });
    t.model.suggestions({ type: 'Suggestion' });
    t.model.approvedSuggestions({ type: 'Suggestion' });
    t.model.teach({ type: 'Subject' });
    t.model.study({ type: 'Subject' });
    t.model.noteLikes({ type: 'Note' });
    t.model.comments({ type: 'NoteComment' });
    t.model.commentLikes({ type: 'NoteComment' });
    t.model.passwordToken({ type: 'PasswordToken' });
    t.model.departments({ type: 'Department' });
    t.model.institute({ type: 'Institute' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
