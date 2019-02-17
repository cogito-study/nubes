import { Resolvers } from '../generated/graphqlgen';
import { AuthPayload } from './AuthPayload';
import { Comment } from './Comment';
import { CommentPreviousValues } from './CommentPreviousValues';
import { FileUploadPayload } from './FileUploadPayload';
import { Institute } from './Institute';
import { Mutation } from './Mutation';
import { Note } from './Note';
import { Query } from './Query';
import { Subject } from './Subject';
import { SubjectInfo } from './SubjectInfo';
import { User } from './User';

export const resolvers: Resolvers = {
  Query,
  User,
  Note,
  Institute,
  Subject,
  SubjectInfo,
  Comment,
  Mutation,
  AuthPayload,
  FileUploadPayload,
  CommentPreviousValues,
};
