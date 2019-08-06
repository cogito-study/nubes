import { AuthPayload } from './AuthPayload';
import { Mutation } from './Mutation';
import { Query } from './Query';
import { Department } from './Department';
import { Institute } from './Institute';
import { Note } from './Note';
import { NoteComment } from './NoteComment';
import { NoteCommentThread } from './NoteCommentThread';
import { NoteHighlight } from './NoteHighlight';
import { PasswordToken } from './PasswordToken';
import { Subject } from './Subject';
import { SubjectInformation } from './SubjectInformation';
import { Suggestion } from './Suggestion';
import { User } from './User';
import { UserRole } from './UserRole';

export const resolvers = {
  Mutation,
  Query,
  AuthPayload,
  Department,
  Institute,
  Note,
  NoteComment,
  NoteCommentThread,
  NoteHighlight,
  PasswordToken,
  Subject,
  SubjectInformation,
  Suggestion,
  User,
  UserRole,
};
