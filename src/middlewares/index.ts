import { instituteMiddlewares } from './institute';
import { departmentMiddlewares } from './department';
import { noteMiddlewares } from './note';
import { noteCommentMiddlewares } from './note-comment';
import { noteCommentThreadMiddlewares } from './note-comment-thread';
import { noteHighlightMiddlewares } from './note-highlight';
import { subjectMiddlewares } from './subject';
import { subjectInformationMiddlewares } from './subject-information';
import { suggestionMiddlewares } from './suggestion';
import { userMiddlewares } from './user';

export const middlewares = [
  instituteMiddlewares,
  departmentMiddlewares,
  noteMiddlewares,
  noteCommentMiddlewares,
  noteCommentThreadMiddlewares,
  noteHighlightMiddlewares,
  subjectMiddlewares,
  subjectInformationMiddlewares,
  suggestionMiddlewares,
  userMiddlewares,
];
