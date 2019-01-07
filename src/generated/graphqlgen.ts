// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import { GraphQLResolveInfo } from "graphql";
import { User, Note, Subject, SubjectInfo, Comment } from "./prisma-client";
import { AuthPayload } from "../types";
import { Context } from "../types";

type UserRole = "USER" | "ADMIN";
type NoteType = "NOTE" | "CASE_STUDY";

export namespace QueryResolvers {
  export const defaultResolvers = {};

  export interface ArgsNote {
    id: string;
  }

  export interface ArgsSubject {
    id: string;
  }

  export type MeResolver = (
    parent: undefined,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | null | Promise<User | null>;

  export type UsersResolver = (
    parent: undefined,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>;

  export type NotesResolver = (
    parent: undefined,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Note[] | Promise<Note[]>;

  export type SubjectsResolver = (
    parent: undefined,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Subject[] | Promise<Subject[]>;

  export type NoteResolver = (
    parent: undefined,
    args: ArgsNote,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Note | null | Promise<Note | null>;

  export type SubjectResolver = (
    parent: undefined,
    args: ArgsSubject,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Subject | null | Promise<Subject | null>;

  export interface Type {
    me: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | null | Promise<User | null>;

    users: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>;

    notes: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Note[] | Promise<Note[]>;

    subjects: (
      parent: undefined,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Subject[] | Promise<Subject[]>;

    note: (
      parent: undefined,
      args: ArgsNote,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Note | null | Promise<Note | null>;

    subject: (
      parent: undefined,
      args: ArgsSubject,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Subject | null | Promise<Subject | null>;
  }
}

export namespace UserResolvers {
  export const defaultResolvers = {
    id: (parent: User) => parent.id,
    email: (parent: User) => parent.email,
    neptun: (parent: User) => parent.neptun,
    password: (parent: User) => parent.password,
    firstName: (parent: User) =>
      parent.firstName === undefined ? null : parent.firstName,
    lastName: (parent: User) =>
      parent.lastName === undefined ? null : parent.lastName,
    role: (parent: User) => parent.role
  };

  export type IdResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type EmailResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type NeptunResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type PasswordResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type FirstNameResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>;

  export type LastNameResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>;

  export type RoleResolver = (
    parent: User,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => UserRole | Promise<UserRole>;

  export interface Type {
    id: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    email: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    neptun: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    password: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    firstName: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>;

    lastName: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>;

    role: (
      parent: User,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => UserRole | Promise<UserRole>;
  }
}

export namespace NoteResolvers {
  export const defaultResolvers = {
    id: (parent: Note) => parent.id,
    text: (parent: Note) => parent.text,
    description: (parent: Note) =>
      parent.description === undefined ? null : parent.description,
    createdAt: (parent: Note) => parent.createdAt,
    updatedAt: (parent: Note) => parent.updatedAt,
    type: (parent: Note) => parent.type
  };

  export type IdResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type TextResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type DescriptionResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>;

  export type CreatedAtResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type UpdatedAtResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type AuthorResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>;

  export type SubjectResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Subject | Promise<Subject>;

  export type CommentsResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Comment[] | Promise<Comment[]>;

  export type TypeResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => NoteType | Promise<NoteType>;

  export type UpvotesResolver = (
    parent: Note,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>;

  export interface Type {
    id: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    text: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    description: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>;

    createdAt: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    updatedAt: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    author: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>;

    subject: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Subject | Promise<Subject>;

    comments: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Comment[] | Promise<Comment[]>;

    type: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => NoteType | Promise<NoteType>;

    upvotes: (
      parent: Note,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>;
  }
}

export namespace SubjectResolvers {
  export const defaultResolvers = {
    id: (parent: Subject) => parent.id,
    code: (parent: Subject) => parent.code,
    name: (parent: Subject) => parent.name,
    description: (parent: Subject) => parent.description
  };

  export type IdResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type CodeResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type NameResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type DescriptionResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type FacultyResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>;

  export type StudentsResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>;

  export type InfoResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => SubjectInfo[] | Promise<SubjectInfo[]>;

  export type NotesResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Note[] | Promise<Note[]>;

  export type PrerequisitesResolver = (
    parent: Subject,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Subject[] | Promise<Subject[]>;

  export interface Type {
    id: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    code: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    name: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    description: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    faculty: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>;

    students: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>;

    info: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => SubjectInfo[] | Promise<SubjectInfo[]>;

    notes: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Note[] | Promise<Note[]>;

    prerequisites: (
      parent: Subject,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Subject[] | Promise<Subject[]>;
  }
}

export namespace SubjectInfoResolvers {
  export const defaultResolvers = {
    title: (parent: SubjectInfo) => parent.title,
    subtitle: (parent: SubjectInfo) =>
      parent.subtitle === undefined ? null : parent.subtitle,
    text: (parent: SubjectInfo) => parent.text
  };

  export type TitleResolver = (
    parent: SubjectInfo,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type SubtitleResolver = (
    parent: SubjectInfo,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | null | Promise<string | null>;

  export type TextResolver = (
    parent: SubjectInfo,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type SubjectResolver = (
    parent: SubjectInfo,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Subject | Promise<Subject>;

  export interface Type {
    title: (
      parent: SubjectInfo,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    subtitle: (
      parent: SubjectInfo,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | null | Promise<string | null>;

    text: (
      parent: SubjectInfo,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    subject: (
      parent: SubjectInfo,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Subject | Promise<Subject>;
  }
}

export namespace CommentResolvers {
  export const defaultResolvers = {
    id: (parent: Comment) => parent.id,
    text: (parent: Comment) => parent.text,
    createdAt: (parent: Comment) => parent.createdAt
  };

  export type IdResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type TextResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type CreatedAtResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type NoteResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Note | Promise<Note>;

  export type AuthorResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>;

  export type RepliesResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => Comment[] | Promise<Comment[]>;

  export type UpvotesResolver = (
    parent: Comment,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User[] | Promise<User[]>;

  export interface Type {
    id: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    text: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    createdAt: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    note: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Note | Promise<Note>;

    author: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>;

    replies: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => Comment[] | Promise<Comment[]>;

    upvotes: (
      parent: Comment,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User[] | Promise<User[]>;
  }
}

export namespace MutationResolvers {
  export const defaultResolvers = {};

  export interface ArgsSignup {
    email: string;
    password: string;
    neptun: string;
    role: UserRole;
  }

  export interface ArgsLogin {
    email: string;
    password: string;
  }

  export type SignupResolver = (
    parent: undefined,
    args: ArgsSignup,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => AuthPayload | Promise<AuthPayload>;

  export type LoginResolver = (
    parent: undefined,
    args: ArgsLogin,
    ctx: Context,
    info: GraphQLResolveInfo
  ) => AuthPayload | Promise<AuthPayload>;

  export interface Type {
    signup: (
      parent: undefined,
      args: ArgsSignup,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => AuthPayload | Promise<AuthPayload>;

    login: (
      parent: undefined,
      args: ArgsLogin,
      ctx: Context,
      info: GraphQLResolveInfo
    ) => AuthPayload | Promise<AuthPayload>;
  }
}

export namespace AuthPayloadResolvers {
  export const defaultResolvers = {
    token: (parent: AuthPayload) => parent.token,
    user: (parent: AuthPayload) => parent.user
  };

  export type TokenResolver = (
    parent: AuthPayload,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => string | Promise<string>;

  export type UserResolver = (
    parent: AuthPayload,
    args: {},
    ctx: Context,
    info: GraphQLResolveInfo
  ) => User | Promise<User>;

  export interface Type {
    token: (
      parent: AuthPayload,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => string | Promise<string>;

    user: (
      parent: AuthPayload,
      args: {},
      ctx: Context,
      info: GraphQLResolveInfo
    ) => User | Promise<User>;
  }
}

export interface Resolvers {
  Query: QueryResolvers.Type;
  User: UserResolvers.Type;
  Note: NoteResolvers.Type;
  Subject: SubjectResolvers.Type;
  SubjectInfo: SubjectInfoResolvers.Type;
  Comment: CommentResolvers.Type;
  Mutation: MutationResolvers.Type;
  AuthPayload: AuthPayloadResolvers.Type;
}
