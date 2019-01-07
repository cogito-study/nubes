export const typeDefs = /* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregateNote {
  count: Int!
}

type AggregatePost {
  count: Int!
}

type AggregateSubject {
  count: Int!
}

type AggregateSubjectInfo {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  authorId: ID!
  text: String!
  replies: [ID!]!
  upvotes: [ID!]!
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  authorId: ID!
  text: String!
  replies: CommentCreaterepliesInput
  upvotes: CommentCreateupvotesInput
}

input CommentCreaterepliesInput {
  set: [ID!]
}

input CommentCreateupvotesInput {
  set: [ID!]
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  authorId_ASC
  authorId_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  authorId: ID!
  text: String!
  replies: [ID!]!
  upvotes: [ID!]!
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateInput {
  authorId: ID
  text: String
  replies: CommentUpdaterepliesInput
  upvotes: CommentUpdateupvotesInput
}

input CommentUpdateManyMutationInput {
  authorId: ID
  text: String
  replies: CommentUpdaterepliesInput
  upvotes: CommentUpdateupvotesInput
}

input CommentUpdaterepliesInput {
  set: [ID!]
}

input CommentUpdateupvotesInput {
  set: [ID!]
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  authorId: ID
  authorId_not: ID
  authorId_in: [ID!]
  authorId_not_in: [ID!]
  authorId_lt: ID
  authorId_lte: ID
  authorId_gt: ID
  authorId_gte: ID
  authorId_contains: ID
  authorId_not_contains: ID
  authorId_starts_with: ID
  authorId_not_starts_with: ID
  authorId_ends_with: ID
  authorId_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createNote(data: NoteCreateInput!): Note!
  updateNote(data: NoteUpdateInput!, where: NoteWhereUniqueInput!): Note
  updateManyNotes(data: NoteUpdateManyMutationInput!, where: NoteWhereInput): BatchPayload!
  upsertNote(where: NoteWhereUniqueInput!, create: NoteCreateInput!, update: NoteUpdateInput!): Note!
  deleteNote(where: NoteWhereUniqueInput!): Note
  deleteManyNotes(where: NoteWhereInput): BatchPayload!
  createPost(data: PostCreateInput!): Post!
  updatePost(data: PostUpdateInput!, where: PostWhereUniqueInput!): Post
  updateManyPosts(data: PostUpdateManyMutationInput!, where: PostWhereInput): BatchPayload!
  upsertPost(where: PostWhereUniqueInput!, create: PostCreateInput!, update: PostUpdateInput!): Post!
  deletePost(where: PostWhereUniqueInput!): Post
  deleteManyPosts(where: PostWhereInput): BatchPayload!
  createSubject(data: SubjectCreateInput!): Subject!
  updateSubject(data: SubjectUpdateInput!, where: SubjectWhereUniqueInput!): Subject
  updateManySubjects(data: SubjectUpdateManyMutationInput!, where: SubjectWhereInput): BatchPayload!
  upsertSubject(where: SubjectWhereUniqueInput!, create: SubjectCreateInput!, update: SubjectUpdateInput!): Subject!
  deleteSubject(where: SubjectWhereUniqueInput!): Subject
  deleteManySubjects(where: SubjectWhereInput): BatchPayload!
  createSubjectInfo(data: SubjectInfoCreateInput!): SubjectInfo!
  updateManySubjectInfoes(data: SubjectInfoUpdateManyMutationInput!, where: SubjectInfoWhereInput): BatchPayload!
  deleteManySubjectInfoes(where: SubjectInfoWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Note {
  id: ID!
  authorId: ID!
  text: String!
  comments: [ID!]!
  noteType: NoteType!
  description: String
  upvotes: [ID!]!
}

type NoteConnection {
  pageInfo: PageInfo!
  edges: [NoteEdge]!
  aggregate: AggregateNote!
}

input NoteCreatecommentsInput {
  set: [ID!]
}

input NoteCreateInput {
  authorId: ID!
  text: String!
  comments: NoteCreatecommentsInput
  noteType: NoteType!
  description: String
  upvotes: NoteCreateupvotesInput
}

input NoteCreateupvotesInput {
  set: [ID!]
}

type NoteEdge {
  node: Note!
  cursor: String!
}

enum NoteOrderByInput {
  id_ASC
  id_DESC
  authorId_ASC
  authorId_DESC
  text_ASC
  text_DESC
  noteType_ASC
  noteType_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type NotePreviousValues {
  id: ID!
  authorId: ID!
  text: String!
  comments: [ID!]!
  noteType: NoteType!
  description: String
  upvotes: [ID!]!
}

type NoteSubscriptionPayload {
  mutation: MutationType!
  node: Note
  updatedFields: [String!]
  previousValues: NotePreviousValues
}

input NoteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: NoteWhereInput
  AND: [NoteSubscriptionWhereInput!]
  OR: [NoteSubscriptionWhereInput!]
  NOT: [NoteSubscriptionWhereInput!]
}

enum NoteType {
  NOTE
  CASE_STUDY
}

input NoteUpdatecommentsInput {
  set: [ID!]
}

input NoteUpdateInput {
  authorId: ID
  text: String
  comments: NoteUpdatecommentsInput
  noteType: NoteType
  description: String
  upvotes: NoteUpdateupvotesInput
}

input NoteUpdateManyMutationInput {
  authorId: ID
  text: String
  comments: NoteUpdatecommentsInput
  noteType: NoteType
  description: String
  upvotes: NoteUpdateupvotesInput
}

input NoteUpdateupvotesInput {
  set: [ID!]
}

input NoteWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  authorId: ID
  authorId_not: ID
  authorId_in: [ID!]
  authorId_not_in: [ID!]
  authorId_lt: ID
  authorId_lte: ID
  authorId_gt: ID
  authorId_gte: ID
  authorId_contains: ID
  authorId_not_contains: ID
  authorId_starts_with: ID
  authorId_not_starts_with: ID
  authorId_ends_with: ID
  authorId_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  noteType: NoteType
  noteType_not: NoteType
  noteType_in: [NoteType!]
  noteType_not_in: [NoteType!]
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  AND: [NoteWhereInput!]
  OR: [NoteWhereInput!]
  NOT: [NoteWhereInput!]
}

input NoteWhereUniqueInput {
  id: ID
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Post {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
  author: User!
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
  aggregate: AggregatePost!
}

input PostCreateInput {
  published: Boolean
  title: String!
  content: String
  author: UserCreateOneInput!
}

type PostEdge {
  node: Post!
  cursor: String!
}

enum PostOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  title_ASC
  title_DESC
  content_ASC
  content_DESC
}

type PostPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  title: String!
  content: String
}

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
  updatedFields: [String!]
  previousValues: PostPreviousValues
}

input PostSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PostWhereInput
  AND: [PostSubscriptionWhereInput!]
  OR: [PostSubscriptionWhereInput!]
  NOT: [PostSubscriptionWhereInput!]
}

input PostUpdateInput {
  published: Boolean
  title: String
  content: String
  author: UserUpdateOneRequiredInput
}

input PostUpdateManyMutationInput {
  published: Boolean
  title: String
  content: String
}

input PostWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  content: String
  content_not: String
  content_in: [String!]
  content_not_in: [String!]
  content_lt: String
  content_lte: String
  content_gt: String
  content_gte: String
  content_contains: String
  content_not_contains: String
  content_starts_with: String
  content_not_starts_with: String
  content_ends_with: String
  content_not_ends_with: String
  author: UserWhereInput
  AND: [PostWhereInput!]
  OR: [PostWhereInput!]
  NOT: [PostWhereInput!]
}

input PostWhereUniqueInput {
  id: ID
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  note(where: NoteWhereUniqueInput!): Note
  notes(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Note]!
  notesConnection(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NoteConnection!
  post(where: PostWhereUniqueInput!): Post
  posts(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Post]!
  postsConnection(where: PostWhereInput, orderBy: PostOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PostConnection!
  subject(where: SubjectWhereUniqueInput!): Subject
  subjects(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject]!
  subjectsConnection(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubjectConnection!
  subjectInfoes(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubjectInfo]!
  subjectInfoesConnection(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubjectInfoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subject {
  id: ID!
  name: String!
  code: String!
  faculty: [ID!]!
  students: [ID!]!
  subjectInfos(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubjectInfo!]
  prerequisites: [ID!]!
  notes: [ID!]!
}

type SubjectConnection {
  pageInfo: PageInfo!
  edges: [SubjectEdge]!
  aggregate: AggregateSubject!
}

input SubjectCreatefacultyInput {
  set: [ID!]
}

input SubjectCreateInput {
  name: String!
  code: String!
  faculty: SubjectCreatefacultyInput
  students: SubjectCreatestudentsInput
  subjectInfos: SubjectInfoCreateManyInput
  prerequisites: SubjectCreateprerequisitesInput
  notes: SubjectCreatenotesInput
}

input SubjectCreatenotesInput {
  set: [ID!]
}

input SubjectCreateprerequisitesInput {
  set: [ID!]
}

input SubjectCreatestudentsInput {
  set: [ID!]
}

type SubjectEdge {
  node: Subject!
  cursor: String!
}

type SubjectInfo {
  title: String!
  subtitle: String
  text: String!
}

type SubjectInfoConnection {
  pageInfo: PageInfo!
  edges: [SubjectInfoEdge]!
  aggregate: AggregateSubjectInfo!
}

input SubjectInfoCreateInput {
  title: String!
  subtitle: String
  text: String!
}

input SubjectInfoCreateManyInput {
  create: [SubjectInfoCreateInput!]
}

type SubjectInfoEdge {
  node: SubjectInfo!
  cursor: String!
}

enum SubjectInfoOrderByInput {
  title_ASC
  title_DESC
  subtitle_ASC
  subtitle_DESC
  text_ASC
  text_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SubjectInfoPreviousValues {
  title: String!
  subtitle: String
  text: String!
}

input SubjectInfoScalarWhereInput {
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  subtitle: String
  subtitle_not: String
  subtitle_in: [String!]
  subtitle_not_in: [String!]
  subtitle_lt: String
  subtitle_lte: String
  subtitle_gt: String
  subtitle_gte: String
  subtitle_contains: String
  subtitle_not_contains: String
  subtitle_starts_with: String
  subtitle_not_starts_with: String
  subtitle_ends_with: String
  subtitle_not_ends_with: String
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [SubjectInfoScalarWhereInput!]
  OR: [SubjectInfoScalarWhereInput!]
  NOT: [SubjectInfoScalarWhereInput!]
}

type SubjectInfoSubscriptionPayload {
  mutation: MutationType!
  node: SubjectInfo
  updatedFields: [String!]
  previousValues: SubjectInfoPreviousValues
}

input SubjectInfoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SubjectInfoWhereInput
  AND: [SubjectInfoSubscriptionWhereInput!]
  OR: [SubjectInfoSubscriptionWhereInput!]
  NOT: [SubjectInfoSubscriptionWhereInput!]
}

input SubjectInfoUpdateManyDataInput {
  title: String
  subtitle: String
  text: String
}

input SubjectInfoUpdateManyInput {
  create: [SubjectInfoCreateInput!]
  deleteMany: [SubjectInfoScalarWhereInput!]
  updateMany: [SubjectInfoUpdateManyWithWhereNestedInput!]
}

input SubjectInfoUpdateManyMutationInput {
  title: String
  subtitle: String
  text: String
}

input SubjectInfoUpdateManyWithWhereNestedInput {
  where: SubjectInfoScalarWhereInput!
  data: SubjectInfoUpdateManyDataInput!
}

input SubjectInfoWhereInput {
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  subtitle: String
  subtitle_not: String
  subtitle_in: [String!]
  subtitle_not_in: [String!]
  subtitle_lt: String
  subtitle_lte: String
  subtitle_gt: String
  subtitle_gte: String
  subtitle_contains: String
  subtitle_not_contains: String
  subtitle_starts_with: String
  subtitle_not_starts_with: String
  subtitle_ends_with: String
  subtitle_not_ends_with: String
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  AND: [SubjectInfoWhereInput!]
  OR: [SubjectInfoWhereInput!]
  NOT: [SubjectInfoWhereInput!]
}

enum SubjectOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  code_ASC
  code_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SubjectPreviousValues {
  id: ID!
  name: String!
  code: String!
  faculty: [ID!]!
  students: [ID!]!
  prerequisites: [ID!]!
  notes: [ID!]!
}

type SubjectSubscriptionPayload {
  mutation: MutationType!
  node: Subject
  updatedFields: [String!]
  previousValues: SubjectPreviousValues
}

input SubjectSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SubjectWhereInput
  AND: [SubjectSubscriptionWhereInput!]
  OR: [SubjectSubscriptionWhereInput!]
  NOT: [SubjectSubscriptionWhereInput!]
}

input SubjectUpdatefacultyInput {
  set: [ID!]
}

input SubjectUpdateInput {
  name: String
  code: String
  faculty: SubjectUpdatefacultyInput
  students: SubjectUpdatestudentsInput
  subjectInfos: SubjectInfoUpdateManyInput
  prerequisites: SubjectUpdateprerequisitesInput
  notes: SubjectUpdatenotesInput
}

input SubjectUpdateManyMutationInput {
  name: String
  code: String
  faculty: SubjectUpdatefacultyInput
  students: SubjectUpdatestudentsInput
  prerequisites: SubjectUpdateprerequisitesInput
  notes: SubjectUpdatenotesInput
}

input SubjectUpdatenotesInput {
  set: [ID!]
}

input SubjectUpdateprerequisitesInput {
  set: [ID!]
}

input SubjectUpdatestudentsInput {
  set: [ID!]
}

input SubjectWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  subjectInfos_every: SubjectInfoWhereInput
  subjectInfos_some: SubjectInfoWhereInput
  subjectInfos_none: SubjectInfoWhereInput
  AND: [SubjectWhereInput!]
  OR: [SubjectWhereInput!]
  NOT: [SubjectWhereInput!]
}

input SubjectWhereUniqueInput {
  id: ID
  name: String
  code: String
}

type Subscription {
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  note(where: NoteSubscriptionWhereInput): NoteSubscriptionPayload
  post(where: PostSubscriptionWhereInput): PostSubscriptionPayload
  subject(where: SubjectSubscriptionWhereInput): SubjectSubscriptionPayload
  subjectInfo(where: SubjectInfoSubscriptionWhereInput): SubjectInfoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  password: String!
  email: String!
  firstname: String
  lastname: String
  neptun: String!
  isAdmin: Boolean!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  password: String!
  email: String!
  firstname: String
  lastname: String
  neptun: String!
  isAdmin: Boolean!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  password_ASC
  password_DESC
  email_ASC
  email_DESC
  firstname_ASC
  firstname_DESC
  lastname_ASC
  lastname_DESC
  neptun_ASC
  neptun_DESC
  isAdmin_ASC
  isAdmin_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  password: String!
  email: String!
  firstname: String
  lastname: String
  neptun: String!
  isAdmin: Boolean!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  password: String
  email: String
  firstname: String
  lastname: String
  neptun: String
  isAdmin: Boolean
}

input UserUpdateInput {
  password: String
  email: String
  firstname: String
  lastname: String
  neptun: String
  isAdmin: Boolean
}

input UserUpdateManyMutationInput {
  password: String
  email: String
  firstname: String
  lastname: String
  neptun: String
  isAdmin: Boolean
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  firstname: String
  firstname_not: String
  firstname_in: [String!]
  firstname_not_in: [String!]
  firstname_lt: String
  firstname_lte: String
  firstname_gt: String
  firstname_gte: String
  firstname_contains: String
  firstname_not_contains: String
  firstname_starts_with: String
  firstname_not_starts_with: String
  firstname_ends_with: String
  firstname_not_ends_with: String
  lastname: String
  lastname_not: String
  lastname_in: [String!]
  lastname_not_in: [String!]
  lastname_lt: String
  lastname_lte: String
  lastname_gt: String
  lastname_gte: String
  lastname_contains: String
  lastname_not_contains: String
  lastname_starts_with: String
  lastname_not_starts_with: String
  lastname_ends_with: String
  lastname_not_ends_with: String
  neptun: String
  neptun_not: String
  neptun_in: [String!]
  neptun_not_in: [String!]
  neptun_lt: String
  neptun_lte: String
  neptun_gt: String
  neptun_gte: String
  neptun_contains: String
  neptun_not_contains: String
  neptun_starts_with: String
  neptun_not_starts_with: String
  neptun_ends_with: String
  neptun_not_ends_with: String
  isAdmin: Boolean
  isAdmin_not: Boolean
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  neptun: String
}
`