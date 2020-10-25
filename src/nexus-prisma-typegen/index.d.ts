import * as photon from '@prisma/photon';
import { core } from 'nexus';
// Types helpers
type IsModelNameExistsInGraphQLTypes<ReturnType extends any> = ReturnType extends core.GetGen<
  'objectNames'
>
  ? true
  : false;

type NexusPrismaScalarOpts = {
  alias?: string;
};

type Pagination = {
  first?: boolean;
  last?: boolean;
  before?: boolean;
  after?: boolean;
  skip?: boolean;
};

type RootObjectTypes = Pick<core.GetGen<'rootTypes'>, core.GetGen<'objectNames'>>;

/**
 * Determine if `B` is a subset (or equivalent to) of `A`.
 */
type IsSubset<A, B> = keyof A extends never ? false : B extends A ? true : false;

type OmitByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]: T[Key] extends ValueType ? never : Key }[keyof T]
>;

type GetSubsetTypes<ModelName extends any> = keyof OmitByValue<
  {
    [P in keyof RootObjectTypes]: ModelName extends keyof ModelTypes
      ? IsSubset<RootObjectTypes[P], ModelTypes[ModelName]> extends true
        ? RootObjectTypes[P]
        : never
      : never;
  },
  never
>;

type SubsetTypes<ModelName extends any> = GetSubsetTypes<ModelName> extends never
  ? `ERROR: No subset types are available. Please make sure that one of your GraphQL type is a subset of your t.model('<ModelName>')`
  : GetSubsetTypes<ModelName>;

type DynamicRequiredType<ReturnType extends any> = IsModelNameExistsInGraphQLTypes<
  ReturnType
> extends true
  ? { type?: SubsetTypes<ReturnType> }
  : { type: SubsetTypes<ReturnType> };

type GetNexusPrismaInput<
  ModelName extends any,
  MethodName extends any,
  InputName extends 'filtering' | 'ordering'
> = ModelName extends keyof NexusPrismaInputs
  ? MethodName extends keyof NexusPrismaInputs[ModelName]
    ? NexusPrismaInputs[ModelName][MethodName][InputName]
    : never
  : never;

type NexusPrismaRelationOpts<
  ModelName extends any,
  MethodName extends any,
  ReturnType extends any
> = GetNexusPrismaInput<
  // If GetNexusPrismaInput returns never, it means there are no filtering/ordering args for it. So just use `alias` and `type`
  ModelName,
  MethodName,
  'filtering'
> extends never
  ? {
      alias?: string;
    } & DynamicRequiredType<ReturnType>
  : {
      alias?: string;
      filtering?:
        | boolean
        | Partial<Record<GetNexusPrismaInput<ModelName, MethodName, 'filtering'>, boolean>>;
      ordering?:
        | boolean
        | Partial<Record<GetNexusPrismaInput<ModelName, MethodName, 'ordering'>, boolean>>;
      pagination?: boolean | Pagination;
    } & DynamicRequiredType<ReturnType>;

type IsScalar<TypeName extends any> = TypeName extends core.GetGen<'scalarNames'> ? true : false;

type IsObject<Name extends any> = Name extends core.GetGen<'objectNames'> ? true : false;

type IsEnum<Name extends any> = Name extends core.GetGen<'enumNames'> ? true : false;

type IsInputObject<Name extends any> = Name extends core.GetGen<'inputNames'> ? true : false;

/**
 * The kind that a GraphQL type may be.
 */
type Kind = 'Enum' | 'Object' | 'Scalar' | 'InputObject';

/**
 * Helper to safely reference a Kind type. For example instead of the following
 * which would admit a typo:
 *
 * ```ts
 * type Foo = Bar extends 'scalar' ? ...
 * ```
 *
 * You can do this which guarantees a correct reference:
 *
 * ```ts
 * type Foo = Bar extends AKind<'Scalar'> ? ...
 * ```
 *
 */
type AKind<T extends Kind> = T;

type GetKind<Name extends any> = IsEnum<Name> extends true
  ? 'Enum'
  : IsScalar<Name> extends true
  ? 'Scalar'
  : IsObject<Name> extends true
  ? 'Object'
  : IsInputObject<Name> extends true
  ? 'InputObject'
  : // FIXME should be `never`, but GQL objects named differently
    // than backing type fall into this branch
    'Object';

type NexusPrismaFields<ModelName extends keyof NexusPrismaTypes> = {
  [MethodName in keyof NexusPrismaTypes[ModelName]]: NexusPrismaMethod<
    ModelName,
    MethodName,
    GetKind<NexusPrismaTypes[ModelName][MethodName]> // Is the return type a scalar?
  >;
};

type NexusPrismaMethod<
  ModelName extends keyof NexusPrismaTypes,
  MethodName extends keyof NexusPrismaTypes[ModelName],
  ThisKind extends Kind,
  ReturnType extends any = NexusPrismaTypes[ModelName][MethodName]
> = ThisKind extends AKind<'Enum'>
  ? () => NexusPrismaFields<ModelName>
  : ThisKind extends AKind<'Scalar'>
  ? (opts?: NexusPrismaScalarOpts) => NexusPrismaFields<ModelName> // Return optional scalar opts
  : IsModelNameExistsInGraphQLTypes<ReturnType> extends true // If model name has a mapped graphql types
  ? (
      opts?: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>,
    ) => NexusPrismaFields<ModelName> // Then make opts optional
  : (
      opts: NexusPrismaRelationOpts<ModelName, MethodName, ReturnType>,
    ) => NexusPrismaFields<ModelName>; // Else force use input the related graphql type -> { type: '...' }

type GetNexusPrismaMethod<TypeName extends string> = TypeName extends keyof NexusPrismaMethods
  ? NexusPrismaMethods[TypeName]
  : <CustomTypeName extends keyof ModelTypes>(
      typeName: CustomTypeName,
    ) => NexusPrismaMethods[CustomTypeName];

type GetNexusPrisma<
  TypeName extends string,
  ModelOrCrud extends 'model' | 'crud'
> = ModelOrCrud extends 'model'
  ? TypeName extends 'Mutation'
    ? never
    : TypeName extends 'Query'
    ? never
    : GetNexusPrismaMethod<TypeName>
  : ModelOrCrud extends 'crud'
  ? TypeName extends 'Mutation'
    ? GetNexusPrismaMethod<TypeName>
    : TypeName extends 'Query'
    ? GetNexusPrismaMethod<TypeName>
    : never
  : never;

// Generated
interface ModelTypes {
  Department: photon.Department;
  DepartmentTranslation: photon.DepartmentTranslation;
  Faculty: photon.Faculty;
  FacultyTranslation: photon.FacultyTranslation;
  Institute: photon.Institute;
  InstituteTranslation: photon.InstituteTranslation;
  Language: photon.Language;
  Major: photon.Major;
  MajorTranslation: photon.MajorTranslation;
  NewMajorRequest: photon.NewMajorRequest;
  Note: photon.Note;
  NoteComment: photon.NoteComment;
  NoteCommentThread: photon.NoteCommentThread;
  NoteHighlight: photon.NoteHighlight;
  PasswordToken: photon.PasswordToken;
  Subject: photon.Subject;
  SubjectInformation: photon.SubjectInformation;
  Suggestion: photon.Suggestion;
  User: photon.User;
  Post: photon.Post;
  PostComment: photon.PostComment;
  ActivationToken: photon.ActivationToken;
  ResetPasswordToken: photon.ResetPasswordToken;
  UserRole: photon.UserRole;
  DepartmentPermission: photon.DepartmentPermission;
  FacultyPermission: photon.FacultyPermission;
  InstitutePermission: photon.InstitutePermission;
  MajorPermission: photon.MajorPermission;
  NoteCommentPermission: photon.NoteCommentPermission;
  NoteCommentThreadPermission: photon.NoteCommentThreadPermission;
  NoteHighlightPermission: photon.NoteHighlightPermission;
  NotePermission: photon.NotePermission;
  PostCommentPermission: photon.PostCommentPermission;
  PostPermission: photon.PostPermission;
  SubjectPermission: photon.SubjectPermission;
  SubjectInformationPermission: photon.SubjectInformationPermission;
  SuggestionPermission: photon.SuggestionPermission;
  UserPermission: photon.UserPermission;
}

interface NexusPrismaInputs {
  Query: {
    departments: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'leader'
        | 'institute';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    departmentTranslations: {
      filtering: 'id' | 'name' | 'description' | 'AND' | 'OR' | 'NOT' | 'department' | 'language';
      ordering: 'id' | 'name' | 'description';
    };
    faculties: {
      filtering:
        | 'id'
        | 'translations'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'institute';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    facultyTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'faculty' | 'language';
      ordering: 'id' | 'name';
    };
    institutes: {
      filtering:
        | 'id'
        | 'translations'
        | 'faculties'
        | 'departments'
        | 'users'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    instituteTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'institute' | 'language';
      ordering: 'id' | 'name';
    };
    languages: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'users'
        | 'subjects'
        | 'departmentTranslations'
        | 'facultyTranslations'
        | 'instituteTranslations'
        | 'majorTranslations'
        | 'AND'
        | 'OR'
        | 'NOT';
      ordering: 'id' | 'code' | 'name';
    };
    majors: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'users'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'faculty';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    majorTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'major' | 'language';
      ordering: 'id' | 'name';
    };
    newMajorRequests: {
      filtering:
        | 'id'
        | 'institute'
        | 'major'
        | 'faculty'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'user';
      ordering: 'id' | 'institute' | 'major' | 'faculty' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    notes: {
      filtering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'suggestions'
        | 'commentThreads'
        | 'authors'
        | 'likers'
        | 'highlights'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    noteComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'thread'
        | 'threadReply';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteCommentThreads: {
      filtering:
        | 'id'
        | 'position'
        | 'replies'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'comment'
        | 'note';
      ordering: 'id' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteHighlights: {
      filtering:
        | 'id'
        | 'position'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'user'
        | 'note';
      ordering: 'id' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    passwordTokens: {
      filtering:
        | 'id'
        | 'token'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'user';
      ordering: 'id' | 'token' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjectInformations: {
      filtering:
        | 'id'
        | 'title'
        | 'subtitle'
        | 'content'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering: 'id' | 'title' | 'subtitle' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    suggestions: {
      filtering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'approvedBy'
        | 'note'
        | 'author';
      ordering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    posts: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'comments'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'subject';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'post';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    activationTokens: {
      filtering: 'id' | 'token' | 'createdAt' | 'AND' | 'OR' | 'NOT' | 'user';
      ordering: 'id' | 'token' | 'createdAt';
    };
    resetPasswordTokens: {
      filtering: 'email' | 'token' | 'createdAt' | 'users' | 'AND' | 'OR' | 'NOT';
      ordering: 'email' | 'token' | 'createdAt';
    };
    userRoles: {
      filtering:
        | 'id'
        | 'name'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT';
      ordering: 'id' | 'name' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    departmentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    facultyPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    institutePermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    majorPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteCommentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteCommentThreadPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteHighlightPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    notePermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postCommentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjectPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjectInformationPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    suggestionPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    userPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  Department: {
    translations: {
      filtering: 'id' | 'name' | 'description' | 'AND' | 'OR' | 'NOT' | 'department' | 'language';
      ordering: 'id' | 'name' | 'description';
    };
    subjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  DepartmentTranslation: {};
  Faculty: {
    translations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'faculty' | 'language';
      ordering: 'id' | 'name';
    };
    majors: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'users'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'faculty';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  FacultyTranslation: {};
  Institute: {
    translations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'institute' | 'language';
      ordering: 'id' | 'name';
    };
    faculties: {
      filtering:
        | 'id'
        | 'translations'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'institute';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    departments: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'leader'
        | 'institute';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  InstituteTranslation: {};
  Language: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    subjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    departmentTranslations: {
      filtering: 'id' | 'name' | 'description' | 'AND' | 'OR' | 'NOT' | 'department' | 'language';
      ordering: 'id' | 'name' | 'description';
    };
    facultyTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'faculty' | 'language';
      ordering: 'id' | 'name';
    };
    instituteTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'institute' | 'language';
      ordering: 'id' | 'name';
    };
    majorTranslations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'major' | 'language';
      ordering: 'id' | 'name';
    };
  };
  Major: {
    translations: {
      filtering: 'id' | 'name' | 'AND' | 'OR' | 'NOT' | 'major' | 'language';
      ordering: 'id' | 'name';
    };
    subjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  MajorTranslation: {};
  NewMajorRequest: {};
  Note: {
    suggestions: {
      filtering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'approvedBy'
        | 'note'
        | 'author';
      ordering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    commentThreads: {
      filtering:
        | 'id'
        | 'position'
        | 'replies'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'comment'
        | 'note';
      ordering: 'id' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    authors: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    likers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    highlights: {
      filtering:
        | 'id'
        | 'position'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'user'
        | 'note';
      ordering: 'id' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  NoteComment: {
    likers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  NoteCommentThread: {
    replies: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'thread'
        | 'threadReply';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  NoteHighlight: {
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  PasswordToken: {};
  Subject: {
    moderators: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    teachers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    students: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    informations: {
      filtering:
        | 'id'
        | 'title'
        | 'subtitle'
        | 'content'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering: 'id' | 'title' | 'subtitle' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    notes: {
      filtering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'suggestions'
        | 'commentThreads'
        | 'authors'
        | 'likers'
        | 'highlights'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    posts: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'comments'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'subject';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    majors: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'users'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'faculty';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  SubjectInformation: {
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  Suggestion: {
    likers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  User: {
    notes: {
      filtering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'suggestions'
        | 'commentThreads'
        | 'authors'
        | 'likers'
        | 'highlights'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    noteHighlights: {
      filtering:
        | 'id'
        | 'position'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'user'
        | 'note';
      ordering: 'id' | 'position' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    suggestions: {
      filtering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'approvedBy'
        | 'note'
        | 'author';
      ordering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    approvedSuggestions: {
      filtering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'approvedBy'
        | 'note'
        | 'author';
      ordering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    moderatedSubjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    teachedSubjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    studiedSubjects: {
      filtering:
        | 'id'
        | 'code'
        | 'name'
        | 'description'
        | 'moderators'
        | 'teachers'
        | 'students'
        | 'informations'
        | 'notes'
        | 'posts'
        | 'majors'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'department'
        | 'language';
      ordering: 'id' | 'code' | 'name' | 'description' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    likedNotes: {
      filtering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'suggestions'
        | 'commentThreads'
        | 'authors'
        | 'likers'
        | 'highlights'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'subject';
      ordering:
        | 'id'
        | 'content'
        | 'contentHTML'
        | 'title'
        | 'number'
        | 'description'
        | 'noteCategory'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    noteComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'thread'
        | 'threadReply';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'post';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    likedNoteComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'thread'
        | 'threadReply';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    likedPostComments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'post';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    likedPosts: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'comments'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'subject';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    posts: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'comments'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'subject';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    likedSuggestions: {
      filtering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'approvedBy'
        | 'note'
        | 'author';
      ordering:
        | 'id'
        | 'delta'
        | 'approvedAt'
        | 'rejectedAt'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    departments: {
      filtering:
        | 'id'
        | 'translations'
        | 'subjects'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'leader'
        | 'institute';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    institutes: {
      filtering:
        | 'id'
        | 'translations'
        | 'faculties'
        | 'departments'
        | 'users'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT';
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    departmentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    facultyPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    institutePermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    majorPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    notePermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteCommentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteCommentThreadPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    noteHighlightPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    postCommentPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjectPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    subjectInformationPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    suggestionPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    userPermissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  Post: {
    likers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    comments: {
      filtering:
        | 'id'
        | 'content'
        | 'likers'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'author'
        | 'post';
      ordering: 'id' | 'content' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  PostComment: {
    likers: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
    permissions: {
      filtering:
        | 'id'
        | 'type'
        | 'users'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'object';
      ordering: 'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt';
    };
  };
  ActivationToken: {};
  ResetPasswordToken: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  UserRole: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  DepartmentPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  FacultyPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  InstitutePermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  MajorPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  NoteCommentPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  NoteCommentThreadPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  NoteHighlightPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  NotePermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  PostCommentPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  PostPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  SubjectPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  SubjectInformationPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  SuggestionPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
  UserPermission: {
    users: {
      filtering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'notes'
        | 'noteHighlights'
        | 'suggestions'
        | 'approvedSuggestions'
        | 'moderatedSubjects'
        | 'teachedSubjects'
        | 'studiedSubjects'
        | 'likedNotes'
        | 'noteComments'
        | 'postComments'
        | 'likedNoteComments'
        | 'likedPostComments'
        | 'likedPosts'
        | 'posts'
        | 'likedSuggestions'
        | 'departments'
        | 'institutes'
        | 'departmentPermissions'
        | 'facultyPermissions'
        | 'institutePermissions'
        | 'majorPermissions'
        | 'notePermissions'
        | 'noteCommentPermissions'
        | 'noteCommentThreadPermissions'
        | 'noteHighlightPermissions'
        | 'postPermissions'
        | 'postCommentPermissions'
        | 'subjectPermissions'
        | 'subjectInformationPermissions'
        | 'suggestionPermissions'
        | 'userPermissions'
        | 'permissions'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt'
        | 'AND'
        | 'OR'
        | 'NOT'
        | 'activationToken'
        | 'ResetPasswordToken'
        | 'role'
        | 'major'
        | 'passwordToken'
        | 'preferredLanguage'
        | 'newMajorRequest';
      ordering:
        | 'id'
        | 'email'
        | 'password'
        | 'profilePictureURL'
        | 'firstName'
        | 'lastName'
        | 'phoneNumber'
        | 'identifier'
        | 'position'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
        | 'deletedAt';
    };
  };
}

interface NexusPrismaTypes {
  Query: {
    department: 'Department';
    departments: 'Department';
    departmentTranslation: 'DepartmentTranslation';
    departmentTranslations: 'DepartmentTranslation';
    faculty: 'Faculty';
    faculties: 'Faculty';
    facultyTranslation: 'FacultyTranslation';
    facultyTranslations: 'FacultyTranslation';
    institute: 'Institute';
    institutes: 'Institute';
    instituteTranslation: 'InstituteTranslation';
    instituteTranslations: 'InstituteTranslation';
    language: 'Language';
    languages: 'Language';
    major: 'Major';
    majors: 'Major';
    majorTranslation: 'MajorTranslation';
    majorTranslations: 'MajorTranslation';
    newMajorRequest: 'NewMajorRequest';
    newMajorRequests: 'NewMajorRequest';
    note: 'Note';
    notes: 'Note';
    noteComment: 'NoteComment';
    noteComments: 'NoteComment';
    noteCommentThread: 'NoteCommentThread';
    noteCommentThreads: 'NoteCommentThread';
    noteHighlight: 'NoteHighlight';
    noteHighlights: 'NoteHighlight';
    passwordToken: 'PasswordToken';
    passwordTokens: 'PasswordToken';
    subject: 'Subject';
    subjects: 'Subject';
    subjectInformation: 'SubjectInformation';
    subjectInformations: 'SubjectInformation';
    suggestion: 'Suggestion';
    suggestions: 'Suggestion';
    user: 'User';
    users: 'User';
    post: 'Post';
    posts: 'Post';
    postComment: 'PostComment';
    postComments: 'PostComment';
    activationToken: 'ActivationToken';
    activationTokens: 'ActivationToken';
    resetPasswordToken: 'ResetPasswordToken';
    resetPasswordTokens: 'ResetPasswordToken';
    userRole: 'UserRole';
    userRoles: 'UserRole';
    departmentPermission: 'DepartmentPermission';
    departmentPermissions: 'DepartmentPermission';
    facultyPermission: 'FacultyPermission';
    facultyPermissions: 'FacultyPermission';
    institutePermission: 'InstitutePermission';
    institutePermissions: 'InstitutePermission';
    majorPermission: 'MajorPermission';
    majorPermissions: 'MajorPermission';
    noteCommentPermission: 'NoteCommentPermission';
    noteCommentPermissions: 'NoteCommentPermission';
    noteCommentThreadPermission: 'NoteCommentThreadPermission';
    noteCommentThreadPermissions: 'NoteCommentThreadPermission';
    noteHighlightPermission: 'NoteHighlightPermission';
    noteHighlightPermissions: 'NoteHighlightPermission';
    notePermission: 'NotePermission';
    notePermissions: 'NotePermission';
    postCommentPermission: 'PostCommentPermission';
    postCommentPermissions: 'PostCommentPermission';
    postPermission: 'PostPermission';
    postPermissions: 'PostPermission';
    subjectPermission: 'SubjectPermission';
    subjectPermissions: 'SubjectPermission';
    subjectInformationPermission: 'SubjectInformationPermission';
    subjectInformationPermissions: 'SubjectInformationPermission';
    suggestionPermission: 'SuggestionPermission';
    suggestionPermissions: 'SuggestionPermission';
    userPermission: 'UserPermission';
    userPermissions: 'UserPermission';
  };
  Mutation: {
    createOneDepartment: 'Department';
    updateOneDepartment: 'Department';
    updateManyDepartment: 'BatchPayload';
    deleteOneDepartment: 'Department';
    deleteManyDepartment: 'BatchPayload';
    upsertOneDepartment: 'Department';
    createOneDepartmentTranslation: 'DepartmentTranslation';
    updateOneDepartmentTranslation: 'DepartmentTranslation';
    updateManyDepartmentTranslation: 'BatchPayload';
    deleteOneDepartmentTranslation: 'DepartmentTranslation';
    deleteManyDepartmentTranslation: 'BatchPayload';
    upsertOneDepartmentTranslation: 'DepartmentTranslation';
    createOneFaculty: 'Faculty';
    updateOneFaculty: 'Faculty';
    updateManyFaculty: 'BatchPayload';
    deleteOneFaculty: 'Faculty';
    deleteManyFaculty: 'BatchPayload';
    upsertOneFaculty: 'Faculty';
    createOneFacultyTranslation: 'FacultyTranslation';
    updateOneFacultyTranslation: 'FacultyTranslation';
    updateManyFacultyTranslation: 'BatchPayload';
    deleteOneFacultyTranslation: 'FacultyTranslation';
    deleteManyFacultyTranslation: 'BatchPayload';
    upsertOneFacultyTranslation: 'FacultyTranslation';
    createOneInstitute: 'Institute';
    updateOneInstitute: 'Institute';
    updateManyInstitute: 'BatchPayload';
    deleteOneInstitute: 'Institute';
    deleteManyInstitute: 'BatchPayload';
    upsertOneInstitute: 'Institute';
    createOneInstituteTranslation: 'InstituteTranslation';
    updateOneInstituteTranslation: 'InstituteTranslation';
    updateManyInstituteTranslation: 'BatchPayload';
    deleteOneInstituteTranslation: 'InstituteTranslation';
    deleteManyInstituteTranslation: 'BatchPayload';
    upsertOneInstituteTranslation: 'InstituteTranslation';
    createOneLanguage: 'Language';
    updateOneLanguage: 'Language';
    updateManyLanguage: 'BatchPayload';
    deleteOneLanguage: 'Language';
    deleteManyLanguage: 'BatchPayload';
    upsertOneLanguage: 'Language';
    createOneMajor: 'Major';
    updateOneMajor: 'Major';
    updateManyMajor: 'BatchPayload';
    deleteOneMajor: 'Major';
    deleteManyMajor: 'BatchPayload';
    upsertOneMajor: 'Major';
    createOneMajorTranslation: 'MajorTranslation';
    updateOneMajorTranslation: 'MajorTranslation';
    updateManyMajorTranslation: 'BatchPayload';
    deleteOneMajorTranslation: 'MajorTranslation';
    deleteManyMajorTranslation: 'BatchPayload';
    upsertOneMajorTranslation: 'MajorTranslation';
    createOneNewMajorRequest: 'NewMajorRequest';
    updateOneNewMajorRequest: 'NewMajorRequest';
    updateManyNewMajorRequest: 'BatchPayload';
    deleteOneNewMajorRequest: 'NewMajorRequest';
    deleteManyNewMajorRequest: 'BatchPayload';
    upsertOneNewMajorRequest: 'NewMajorRequest';
    createOneNote: 'Note';
    updateOneNote: 'Note';
    updateManyNote: 'BatchPayload';
    deleteOneNote: 'Note';
    deleteManyNote: 'BatchPayload';
    upsertOneNote: 'Note';
    createOneNoteComment: 'NoteComment';
    updateOneNoteComment: 'NoteComment';
    updateManyNoteComment: 'BatchPayload';
    deleteOneNoteComment: 'NoteComment';
    deleteManyNoteComment: 'BatchPayload';
    upsertOneNoteComment: 'NoteComment';
    createOneNoteCommentThread: 'NoteCommentThread';
    updateOneNoteCommentThread: 'NoteCommentThread';
    updateManyNoteCommentThread: 'BatchPayload';
    deleteOneNoteCommentThread: 'NoteCommentThread';
    deleteManyNoteCommentThread: 'BatchPayload';
    upsertOneNoteCommentThread: 'NoteCommentThread';
    createOneNoteHighlight: 'NoteHighlight';
    updateOneNoteHighlight: 'NoteHighlight';
    updateManyNoteHighlight: 'BatchPayload';
    deleteOneNoteHighlight: 'NoteHighlight';
    deleteManyNoteHighlight: 'BatchPayload';
    upsertOneNoteHighlight: 'NoteHighlight';
    createOnePasswordToken: 'PasswordToken';
    updateOnePasswordToken: 'PasswordToken';
    updateManyPasswordToken: 'BatchPayload';
    deleteOnePasswordToken: 'PasswordToken';
    deleteManyPasswordToken: 'BatchPayload';
    upsertOnePasswordToken: 'PasswordToken';
    createOneSubject: 'Subject';
    updateOneSubject: 'Subject';
    updateManySubject: 'BatchPayload';
    deleteOneSubject: 'Subject';
    deleteManySubject: 'BatchPayload';
    upsertOneSubject: 'Subject';
    createOneSubjectInformation: 'SubjectInformation';
    updateOneSubjectInformation: 'SubjectInformation';
    updateManySubjectInformation: 'BatchPayload';
    deleteOneSubjectInformation: 'SubjectInformation';
    deleteManySubjectInformation: 'BatchPayload';
    upsertOneSubjectInformation: 'SubjectInformation';
    createOneSuggestion: 'Suggestion';
    updateOneSuggestion: 'Suggestion';
    updateManySuggestion: 'BatchPayload';
    deleteOneSuggestion: 'Suggestion';
    deleteManySuggestion: 'BatchPayload';
    upsertOneSuggestion: 'Suggestion';
    createOneUser: 'User';
    updateOneUser: 'User';
    updateManyUser: 'BatchPayload';
    deleteOneUser: 'User';
    deleteManyUser: 'BatchPayload';
    upsertOneUser: 'User';
    createOnePost: 'Post';
    updateOnePost: 'Post';
    updateManyPost: 'BatchPayload';
    deleteOnePost: 'Post';
    deleteManyPost: 'BatchPayload';
    upsertOnePost: 'Post';
    createOnePostComment: 'PostComment';
    updateOnePostComment: 'PostComment';
    updateManyPostComment: 'BatchPayload';
    deleteOnePostComment: 'PostComment';
    deleteManyPostComment: 'BatchPayload';
    upsertOnePostComment: 'PostComment';
    createOneActivationToken: 'ActivationToken';
    updateOneActivationToken: 'ActivationToken';
    updateManyActivationToken: 'BatchPayload';
    deleteOneActivationToken: 'ActivationToken';
    deleteManyActivationToken: 'BatchPayload';
    upsertOneActivationToken: 'ActivationToken';
    createOneResetPasswordToken: 'ResetPasswordToken';
    updateOneResetPasswordToken: 'ResetPasswordToken';
    updateManyResetPasswordToken: 'BatchPayload';
    deleteOneResetPasswordToken: 'ResetPasswordToken';
    deleteManyResetPasswordToken: 'BatchPayload';
    upsertOneResetPasswordToken: 'ResetPasswordToken';
    createOneUserRole: 'UserRole';
    updateOneUserRole: 'UserRole';
    updateManyUserRole: 'BatchPayload';
    deleteOneUserRole: 'UserRole';
    deleteManyUserRole: 'BatchPayload';
    upsertOneUserRole: 'UserRole';
    createOneDepartmentPermission: 'DepartmentPermission';
    updateOneDepartmentPermission: 'DepartmentPermission';
    updateManyDepartmentPermission: 'BatchPayload';
    deleteOneDepartmentPermission: 'DepartmentPermission';
    deleteManyDepartmentPermission: 'BatchPayload';
    upsertOneDepartmentPermission: 'DepartmentPermission';
    createOneFacultyPermission: 'FacultyPermission';
    updateOneFacultyPermission: 'FacultyPermission';
    updateManyFacultyPermission: 'BatchPayload';
    deleteOneFacultyPermission: 'FacultyPermission';
    deleteManyFacultyPermission: 'BatchPayload';
    upsertOneFacultyPermission: 'FacultyPermission';
    createOneInstitutePermission: 'InstitutePermission';
    updateOneInstitutePermission: 'InstitutePermission';
    updateManyInstitutePermission: 'BatchPayload';
    deleteOneInstitutePermission: 'InstitutePermission';
    deleteManyInstitutePermission: 'BatchPayload';
    upsertOneInstitutePermission: 'InstitutePermission';
    createOneMajorPermission: 'MajorPermission';
    updateOneMajorPermission: 'MajorPermission';
    updateManyMajorPermission: 'BatchPayload';
    deleteOneMajorPermission: 'MajorPermission';
    deleteManyMajorPermission: 'BatchPayload';
    upsertOneMajorPermission: 'MajorPermission';
    createOneNoteCommentPermission: 'NoteCommentPermission';
    updateOneNoteCommentPermission: 'NoteCommentPermission';
    updateManyNoteCommentPermission: 'BatchPayload';
    deleteOneNoteCommentPermission: 'NoteCommentPermission';
    deleteManyNoteCommentPermission: 'BatchPayload';
    upsertOneNoteCommentPermission: 'NoteCommentPermission';
    createOneNoteCommentThreadPermission: 'NoteCommentThreadPermission';
    updateOneNoteCommentThreadPermission: 'NoteCommentThreadPermission';
    updateManyNoteCommentThreadPermission: 'BatchPayload';
    deleteOneNoteCommentThreadPermission: 'NoteCommentThreadPermission';
    deleteManyNoteCommentThreadPermission: 'BatchPayload';
    upsertOneNoteCommentThreadPermission: 'NoteCommentThreadPermission';
    createOneNoteHighlightPermission: 'NoteHighlightPermission';
    updateOneNoteHighlightPermission: 'NoteHighlightPermission';
    updateManyNoteHighlightPermission: 'BatchPayload';
    deleteOneNoteHighlightPermission: 'NoteHighlightPermission';
    deleteManyNoteHighlightPermission: 'BatchPayload';
    upsertOneNoteHighlightPermission: 'NoteHighlightPermission';
    createOneNotePermission: 'NotePermission';
    updateOneNotePermission: 'NotePermission';
    updateManyNotePermission: 'BatchPayload';
    deleteOneNotePermission: 'NotePermission';
    deleteManyNotePermission: 'BatchPayload';
    upsertOneNotePermission: 'NotePermission';
    createOnePostCommentPermission: 'PostCommentPermission';
    updateOnePostCommentPermission: 'PostCommentPermission';
    updateManyPostCommentPermission: 'BatchPayload';
    deleteOnePostCommentPermission: 'PostCommentPermission';
    deleteManyPostCommentPermission: 'BatchPayload';
    upsertOnePostCommentPermission: 'PostCommentPermission';
    createOnePostPermission: 'PostPermission';
    updateOnePostPermission: 'PostPermission';
    updateManyPostPermission: 'BatchPayload';
    deleteOnePostPermission: 'PostPermission';
    deleteManyPostPermission: 'BatchPayload';
    upsertOnePostPermission: 'PostPermission';
    createOneSubjectPermission: 'SubjectPermission';
    updateOneSubjectPermission: 'SubjectPermission';
    updateManySubjectPermission: 'BatchPayload';
    deleteOneSubjectPermission: 'SubjectPermission';
    deleteManySubjectPermission: 'BatchPayload';
    upsertOneSubjectPermission: 'SubjectPermission';
    createOneSubjectInformationPermission: 'SubjectInformationPermission';
    updateOneSubjectInformationPermission: 'SubjectInformationPermission';
    updateManySubjectInformationPermission: 'BatchPayload';
    deleteOneSubjectInformationPermission: 'SubjectInformationPermission';
    deleteManySubjectInformationPermission: 'BatchPayload';
    upsertOneSubjectInformationPermission: 'SubjectInformationPermission';
    createOneSuggestionPermission: 'SuggestionPermission';
    updateOneSuggestionPermission: 'SuggestionPermission';
    updateManySuggestionPermission: 'BatchPayload';
    deleteOneSuggestionPermission: 'SuggestionPermission';
    deleteManySuggestionPermission: 'BatchPayload';
    upsertOneSuggestionPermission: 'SuggestionPermission';
    createOneUserPermission: 'UserPermission';
    updateOneUserPermission: 'UserPermission';
    updateManyUserPermission: 'BatchPayload';
    deleteOneUserPermission: 'UserPermission';
    deleteManyUserPermission: 'BatchPayload';
    upsertOneUserPermission: 'UserPermission';
  };
  Department: {
    id: 'String';
    translations: 'DepartmentTranslation';
    leader: 'User';
    subjects: 'Subject';
    institute: 'Institute';
    permissions: 'DepartmentPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  DepartmentTranslation: {
    id: 'String';
    name: 'String';
    description: 'String';
    department: 'Department';
    language: 'Language';
  };
  Faculty: {
    id: 'String';
    translations: 'FacultyTranslation';
    institute: 'Institute';
    majors: 'Major';
    permissions: 'FacultyPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  FacultyTranslation: {
    id: 'String';
    name: 'String';
    faculty: 'Faculty';
    language: 'Language';
  };
  Institute: {
    id: 'String';
    translations: 'InstituteTranslation';
    faculties: 'Faculty';
    departments: 'Department';
    users: 'User';
    permissions: 'InstitutePermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  InstituteTranslation: {
    id: 'String';
    name: 'String';
    institute: 'Institute';
    language: 'Language';
  };
  Language: {
    id: 'String';
    code: 'LanguageCode';
    name: 'String';
    users: 'User';
    subjects: 'Subject';
    departmentTranslations: 'DepartmentTranslation';
    facultyTranslations: 'FacultyTranslation';
    instituteTranslations: 'InstituteTranslation';
    majorTranslations: 'MajorTranslation';
  };
  Major: {
    id: 'String';
    translations: 'MajorTranslation';
    faculty: 'Faculty';
    subjects: 'Subject';
    users: 'User';
    permissions: 'MajorPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  MajorTranslation: {
    id: 'String';
    name: 'String';
    major: 'Major';
    language: 'Language';
  };
  NewMajorRequest: {
    id: 'String';
    institute: 'String';
    major: 'String';
    faculty: 'String';
    user: 'User';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  Note: {
    id: 'String';
    content: 'String';
    contentHTML: 'String';
    title: 'String';
    number: 'Int';
    description: 'String';
    noteCategory: 'NoteCategory';
    suggestions: 'Suggestion';
    commentThreads: 'NoteCommentThread';
    authors: 'User';
    likers: 'User';
    highlights: 'NoteHighlight';
    subject: 'Subject';
    permissions: 'NotePermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteComment: {
    id: 'String';
    content: 'String';
    author: 'User';
    likers: 'User';
    thread: 'NoteCommentThread';
    threadReply: 'NoteCommentThread';
    permissions: 'NoteCommentPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteCommentThread: {
    id: 'String';
    position: 'String';
    comment: 'NoteComment';
    replies: 'NoteComment';
    note: 'Note';
    permissions: 'NoteCommentThreadPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteHighlight: {
    id: 'String';
    position: 'String';
    user: 'User';
    note: 'Note';
    permissions: 'NoteHighlightPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  PasswordToken: {
    id: 'String';
    token: 'String';
    user: 'User';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  Subject: {
    id: 'String';
    code: 'String';
    name: 'String';
    description: 'String';
    department: 'Department';
    moderators: 'User';
    teachers: 'User';
    students: 'User';
    informations: 'SubjectInformation';
    notes: 'Note';
    posts: 'Post';
    language: 'Language';
    majors: 'Major';
    permissions: 'SubjectPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  SubjectInformation: {
    id: 'String';
    title: 'String';
    subtitle: 'String';
    content: 'String';
    subject: 'Subject';
    permissions: 'SubjectInformationPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  Suggestion: {
    id: 'String';
    delta: 'String';
    approvedAt: 'DateTime';
    rejectedAt: 'DateTime';
    likers: 'User';
    approvedBy: 'User';
    note: 'Note';
    author: 'User';
    permissions: 'SuggestionPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  User: {
    id: 'String';
    email: 'String';
    password: 'String';
    profilePictureURL: 'String';
    firstName: 'String';
    lastName: 'String';
    phoneNumber: 'String';
    identifier: 'String';
    position: 'String';
    activationToken: 'ActivationToken';
    ResetPasswordToken: 'ResetPasswordToken';
    isActive: 'Boolean';
    role: 'UserRole';
    major: 'Major';
    notes: 'Note';
    noteHighlights: 'NoteHighlight';
    suggestions: 'Suggestion';
    approvedSuggestions: 'Suggestion';
    moderatedSubjects: 'Subject';
    teachedSubjects: 'Subject';
    studiedSubjects: 'Subject';
    likedNotes: 'Note';
    noteComments: 'NoteComment';
    postComments: 'PostComment';
    likedNoteComments: 'NoteComment';
    likedPostComments: 'PostComment';
    likedPosts: 'Post';
    posts: 'Post';
    likedSuggestions: 'Suggestion';
    passwordToken: 'PasswordToken';
    departments: 'Department';
    institutes: 'Institute';
    preferredLanguage: 'Language';
    newMajorRequest: 'NewMajorRequest';
    departmentPermissions: 'DepartmentPermission';
    facultyPermissions: 'FacultyPermission';
    institutePermissions: 'InstitutePermission';
    majorPermissions: 'MajorPermission';
    notePermissions: 'NotePermission';
    noteCommentPermissions: 'NoteCommentPermission';
    noteCommentThreadPermissions: 'NoteCommentThreadPermission';
    noteHighlightPermissions: 'NoteHighlightPermission';
    postPermissions: 'PostPermission';
    postCommentPermissions: 'PostCommentPermission';
    subjectPermissions: 'SubjectPermission';
    subjectInformationPermissions: 'SubjectInformationPermission';
    suggestionPermissions: 'SuggestionPermission';
    userPermissions: 'UserPermission';
    permissions: 'UserPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  Post: {
    id: 'String';
    content: 'String';
    author: 'User';
    subject: 'Subject';
    likers: 'User';
    comments: 'PostComment';
    permissions: 'PostPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  PostComment: {
    id: 'String';
    content: 'String';
    author: 'User';
    post: 'Post';
    likers: 'User';
    permissions: 'PostCommentPermission';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  ActivationToken: {
    id: 'String';
    user: 'User';
    token: 'String';
    createdAt: 'DateTime';
  };
  ResetPasswordToken: {
    email: 'String';
    token: 'String';
    createdAt: 'DateTime';
    users: 'User';
  };
  UserRole: {
    id: 'String';
    name: 'String';
    type: 'UserRoleType';
    users: 'User';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  DepartmentPermission: {
    id: 'String';
    type: 'DepartmentPermissionType';
    users: 'User';
    object: 'Department';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  FacultyPermission: {
    id: 'String';
    type: 'FacultyPermissionType';
    users: 'User';
    object: 'Faculty';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  InstitutePermission: {
    id: 'String';
    type: 'InstitutePermissionType';
    users: 'User';
    object: 'Institute';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  MajorPermission: {
    id: 'String';
    type: 'MajorPermissionType';
    users: 'User';
    object: 'Major';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteCommentPermission: {
    id: 'String';
    type: 'NoteCommentPermissionType';
    users: 'User';
    object: 'NoteComment';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteCommentThreadPermission: {
    id: 'String';
    type: 'NoteCommentThreadPermissionType';
    users: 'User';
    object: 'NoteCommentThread';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NoteHighlightPermission: {
    id: 'String';
    type: 'NoteHighlightPermissionType';
    users: 'User';
    object: 'NoteHighlight';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  NotePermission: {
    id: 'String';
    type: 'NotePermissionType';
    users: 'User';
    object: 'Note';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  PostCommentPermission: {
    id: 'String';
    type: 'PostCommentPermissionType';
    users: 'User';
    object: 'PostComment';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  PostPermission: {
    id: 'String';
    type: 'PostPermissionType';
    users: 'User';
    object: 'Post';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  SubjectPermission: {
    id: 'String';
    type: 'SubjectPermissionType';
    users: 'User';
    object: 'Subject';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  SubjectInformationPermission: {
    id: 'String';
    type: 'SubjectInformationPermissionType';
    users: 'User';
    object: 'SubjectInformation';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  SuggestionPermission: {
    id: 'String';
    type: 'SuggestionPermissionType';
    users: 'User';
    object: 'Suggestion';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
  UserPermission: {
    id: 'String';
    type: 'UserPermissionType';
    users: 'User';
    object: 'User';
    createdAt: 'DateTime';
    updatedAt: 'DateTime';
    deletedAt: 'DateTime';
  };
}

interface NexusPrismaMethods {
  Department: NexusPrismaFields<'Department'>;
  DepartmentTranslation: NexusPrismaFields<'DepartmentTranslation'>;
  Faculty: NexusPrismaFields<'Faculty'>;
  FacultyTranslation: NexusPrismaFields<'FacultyTranslation'>;
  Institute: NexusPrismaFields<'Institute'>;
  InstituteTranslation: NexusPrismaFields<'InstituteTranslation'>;
  Language: NexusPrismaFields<'Language'>;
  Major: NexusPrismaFields<'Major'>;
  MajorTranslation: NexusPrismaFields<'MajorTranslation'>;
  NewMajorRequest: NexusPrismaFields<'NewMajorRequest'>;
  Note: NexusPrismaFields<'Note'>;
  NoteComment: NexusPrismaFields<'NoteComment'>;
  NoteCommentThread: NexusPrismaFields<'NoteCommentThread'>;
  NoteHighlight: NexusPrismaFields<'NoteHighlight'>;
  PasswordToken: NexusPrismaFields<'PasswordToken'>;
  Subject: NexusPrismaFields<'Subject'>;
  SubjectInformation: NexusPrismaFields<'SubjectInformation'>;
  Suggestion: NexusPrismaFields<'Suggestion'>;
  User: NexusPrismaFields<'User'>;
  Post: NexusPrismaFields<'Post'>;
  PostComment: NexusPrismaFields<'PostComment'>;
  ActivationToken: NexusPrismaFields<'ActivationToken'>;
  ResetPasswordToken: NexusPrismaFields<'ResetPasswordToken'>;
  UserRole: NexusPrismaFields<'UserRole'>;
  DepartmentPermission: NexusPrismaFields<'DepartmentPermission'>;
  FacultyPermission: NexusPrismaFields<'FacultyPermission'>;
  InstitutePermission: NexusPrismaFields<'InstitutePermission'>;
  MajorPermission: NexusPrismaFields<'MajorPermission'>;
  NoteCommentPermission: NexusPrismaFields<'NoteCommentPermission'>;
  NoteCommentThreadPermission: NexusPrismaFields<'NoteCommentThreadPermission'>;
  NoteHighlightPermission: NexusPrismaFields<'NoteHighlightPermission'>;
  NotePermission: NexusPrismaFields<'NotePermission'>;
  PostCommentPermission: NexusPrismaFields<'PostCommentPermission'>;
  PostPermission: NexusPrismaFields<'PostPermission'>;
  SubjectPermission: NexusPrismaFields<'SubjectPermission'>;
  SubjectInformationPermission: NexusPrismaFields<'SubjectInformationPermission'>;
  SuggestionPermission: NexusPrismaFields<'SuggestionPermission'>;
  UserPermission: NexusPrismaFields<'UserPermission'>;
  Query: NexusPrismaFields<'Query'>;
  Mutation: NexusPrismaFields<'Mutation'>;
}

declare global {
  type NexusPrisma<TypeName extends string, ModelOrCrud extends 'model' | 'crud'> = GetNexusPrisma<
    TypeName,
    ModelOrCrud
  >;
}
