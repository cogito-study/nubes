import { Resolvers } from '../generated/graphqlgen';

import { Query } from './Query';
import { User } from './User';
import { Note } from './Note';
import { Subject } from './Subject';
import { SubjectInfo } from './SubjectInfo';
import { Comment } from './Comment';
import { Mutation } from './Mutation';
import { AuthPayload } from './AuthPayload';
import { FileUploadPayload } from './FileUploadPayload';
import { CommentPreviousValues } from './CommentPreviousValues';

export const resolvers: Resolvers = {
  Query,
  User,
  Note,
  Subject,
  SubjectInfo,
  Comment,
  Mutation,
  AuthPayload,
  FileUploadPayload,
  CommentPreviousValues,
};
