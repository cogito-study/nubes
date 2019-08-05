import { objectType } from '@prisma/nexus';

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.model.id();
    t.model.conent();
    t.model.contentHTML();
    t.model.title();
    t.model.number();
    t.model.description();
    t.model.noteCategory;

    t.model.suggestions({ type: 'Suggestion' });
    t.model.commentThreads({ type: 'NoteCommentThread' });
    t.model.authors({ type: 'User' });
    t.model.likes({ type: 'User' });
    t.model.highlights({ type: 'NoteHighlight' });
    t.model.topHighlights({ type: 'TopNoteHighlight' });
    t.model.subject({ type: 'Subject' });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
