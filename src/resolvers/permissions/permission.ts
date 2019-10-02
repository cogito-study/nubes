import { objectType } from 'nexus';

export const Permission = objectType({
  name: 'Permission',
  definition(t) {
    t.model.id();
    t.model.departmentPermission({ type: 'DepartmentPermission' });
    t.model.institutePermission({ type: 'InstitutePermission' });
    t.model.notePermission({ type: 'NotePermission' });
    t.model.noteCommentPermission({ type: 'NoteCommentPermission' });
    t.model.noteCommentThreadPermission({ type: 'NoteCommentThreadPermission' });
    t.model.noteHighlightPermission({ type: 'NoteHighlightPermission' });
    t.model.subjectPermission({ type: 'SubjectPermission' });
    t.model.subjectInformationPermission({ type: 'SubjectInformationPermission' });
    t.model.suggestionPermission({ type: 'SuggestionPermission' });
    t.model.userPermission({ type: 'UserPermission' });
  },
});
