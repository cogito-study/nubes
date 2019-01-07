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
  author: User!
  note: Note!
  text: String!
  replies(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  upvotes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  author: UserCreateOneInput!
  note: NoteCreateOneWithoutCommentsInput!
  text: String!
  replies: CommentCreateManyInput
  upvotes: UserCreateManyInput
}

input CommentCreateManyInput {
  create: [CommentCreateInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutNoteInput {
  create: [CommentCreateWithoutNoteInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutNoteInput {
  author: UserCreateOneInput!
  text: String!
  replies: CommentCreateManyInput
  upvotes: UserCreateManyInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  text: String!
}

input CommentScalarWhereInput {
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
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
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

input CommentUpdateDataInput {
  author: UserUpdateOneRequiredInput
  note: NoteUpdateOneRequiredWithoutCommentsInput
  text: String
  replies: CommentUpdateManyInput
  upvotes: UserUpdateManyInput
}

input CommentUpdateInput {
  author: UserUpdateOneRequiredInput
  note: NoteUpdateOneRequiredWithoutCommentsInput
  text: String
  replies: CommentUpdateManyInput
  upvotes: UserUpdateManyInput
}

input CommentUpdateManyDataInput {
  text: String
}

input CommentUpdateManyInput {
  create: [CommentCreateInput!]
  update: [CommentUpdateWithWhereUniqueNestedInput!]
  upsert: [CommentUpsertWithWhereUniqueNestedInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyMutationInput {
  text: String
}

input CommentUpdateManyWithoutNoteInput {
  create: [CommentCreateWithoutNoteInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutNoteInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutNoteInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateWithoutNoteDataInput {
  author: UserUpdateOneRequiredInput
  text: String
  replies: CommentUpdateManyInput
  upvotes: UserUpdateManyInput
}

input CommentUpdateWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateDataInput!
}

input CommentUpdateWithWhereUniqueWithoutNoteInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutNoteDataInput!
}

input CommentUpsertWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateDataInput!
  create: CommentCreateInput!
}

input CommentUpsertWithWhereUniqueWithoutNoteInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutNoteDataInput!
  create: CommentCreateWithoutNoteInput!
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
  author: UserWhereInput
  note: NoteWhereInput
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
  replies_every: CommentWhereInput
  replies_some: CommentWhereInput
  replies_none: CommentWhereInput
  upvotes_every: UserWhereInput
  upvotes_some: UserWhereInput
  upvotes_none: UserWhereInput
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
  author: User!
  text: String!
  subject: Subject!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  type: NoteType!
  description: String
  upvotes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type NoteConnection {
  pageInfo: PageInfo!
  edges: [NoteEdge]!
  aggregate: AggregateNote!
}

input NoteCreateInput {
  author: UserCreateOneInput!
  text: String!
  subject: SubjectCreateOneWithoutNotesInput!
  comments: CommentCreateManyWithoutNoteInput
  type: NoteType!
  description: String
  upvotes: UserCreateManyInput
}

input NoteCreateManyWithoutSubjectInput {
  create: [NoteCreateWithoutSubjectInput!]
  connect: [NoteWhereUniqueInput!]
}

input NoteCreateOneWithoutCommentsInput {
  create: NoteCreateWithoutCommentsInput
  connect: NoteWhereUniqueInput
}

input NoteCreateWithoutCommentsInput {
  author: UserCreateOneInput!
  text: String!
  subject: SubjectCreateOneWithoutNotesInput!
  type: NoteType!
  description: String
  upvotes: UserCreateManyInput
}

input NoteCreateWithoutSubjectInput {
  author: UserCreateOneInput!
  text: String!
  comments: CommentCreateManyWithoutNoteInput
  type: NoteType!
  description: String
  upvotes: UserCreateManyInput
}

type NoteEdge {
  node: Note!
  cursor: String!
}

enum NoteOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  type_ASC
  type_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type NotePreviousValues {
  id: ID!
  text: String!
  type: NoteType!
  description: String
}

input NoteScalarWhereInput {
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
  type: NoteType
  type_not: NoteType
  type_in: [NoteType!]
  type_not_in: [NoteType!]
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
  AND: [NoteScalarWhereInput!]
  OR: [NoteScalarWhereInput!]
  NOT: [NoteScalarWhereInput!]
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

input NoteUpdateInput {
  author: UserUpdateOneRequiredInput
  text: String
  subject: SubjectUpdateOneRequiredWithoutNotesInput
  comments: CommentUpdateManyWithoutNoteInput
  type: NoteType
  description: String
  upvotes: UserUpdateManyInput
}

input NoteUpdateManyDataInput {
  text: String
  type: NoteType
  description: String
}

input NoteUpdateManyMutationInput {
  text: String
  type: NoteType
  description: String
}

input NoteUpdateManyWithoutSubjectInput {
  create: [NoteCreateWithoutSubjectInput!]
  delete: [NoteWhereUniqueInput!]
  connect: [NoteWhereUniqueInput!]
  disconnect: [NoteWhereUniqueInput!]
  update: [NoteUpdateWithWhereUniqueWithoutSubjectInput!]
  upsert: [NoteUpsertWithWhereUniqueWithoutSubjectInput!]
  deleteMany: [NoteScalarWhereInput!]
  updateMany: [NoteUpdateManyWithWhereNestedInput!]
}

input NoteUpdateManyWithWhereNestedInput {
  where: NoteScalarWhereInput!
  data: NoteUpdateManyDataInput!
}

input NoteUpdateOneRequiredWithoutCommentsInput {
  create: NoteCreateWithoutCommentsInput
  update: NoteUpdateWithoutCommentsDataInput
  upsert: NoteUpsertWithoutCommentsInput
  connect: NoteWhereUniqueInput
}

input NoteUpdateWithoutCommentsDataInput {
  author: UserUpdateOneRequiredInput
  text: String
  subject: SubjectUpdateOneRequiredWithoutNotesInput
  type: NoteType
  description: String
  upvotes: UserUpdateManyInput
}

input NoteUpdateWithoutSubjectDataInput {
  author: UserUpdateOneRequiredInput
  text: String
  comments: CommentUpdateManyWithoutNoteInput
  type: NoteType
  description: String
  upvotes: UserUpdateManyInput
}

input NoteUpdateWithWhereUniqueWithoutSubjectInput {
  where: NoteWhereUniqueInput!
  data: NoteUpdateWithoutSubjectDataInput!
}

input NoteUpsertWithoutCommentsInput {
  update: NoteUpdateWithoutCommentsDataInput!
  create: NoteCreateWithoutCommentsInput!
}

input NoteUpsertWithWhereUniqueWithoutSubjectInput {
  where: NoteWhereUniqueInput!
  update: NoteUpdateWithoutSubjectDataInput!
  create: NoteCreateWithoutSubjectInput!
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
  author: UserWhereInput
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
  subject: SubjectWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  type: NoteType
  type_not: NoteType
  type_in: [NoteType!]
  type_not_in: [NoteType!]
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
  upvotes_every: UserWhereInput
  upvotes_some: UserWhereInput
  upvotes_none: UserWhereInput
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

enum Role {
  USER
  ADMIN
}

type Subject {
  id: ID!
  code: String!
  name: String!
  description: String!
  faculty(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  students(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  subjectInfos(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubjectInfo!]
  prerequisites(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject!]
  notes(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Note!]
}

type SubjectConnection {
  pageInfo: PageInfo!
  edges: [SubjectEdge]!
  aggregate: AggregateSubject!
}

input SubjectCreateInput {
  code: String!
  name: String!
  description: String!
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  subjectInfos: SubjectInfoCreateManyInput
  prerequisites: SubjectCreateManyInput
  notes: NoteCreateManyWithoutSubjectInput
}

input SubjectCreateManyInput {
  create: [SubjectCreateInput!]
  connect: [SubjectWhereUniqueInput!]
}

input SubjectCreateOneWithoutNotesInput {
  create: SubjectCreateWithoutNotesInput
  connect: SubjectWhereUniqueInput
}

input SubjectCreateWithoutNotesInput {
  code: String!
  name: String!
  description: String!
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  subjectInfos: SubjectInfoCreateManyInput
  prerequisites: SubjectCreateManyInput
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
  code_ASC
  code_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SubjectPreviousValues {
  id: ID!
  code: String!
  name: String!
  description: String!
}

input SubjectScalarWhereInput {
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
  AND: [SubjectScalarWhereInput!]
  OR: [SubjectScalarWhereInput!]
  NOT: [SubjectScalarWhereInput!]
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

input SubjectUpdateDataInput {
  code: String
  name: String
  description: String
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  subjectInfos: SubjectInfoUpdateManyInput
  prerequisites: SubjectUpdateManyInput
  notes: NoteUpdateManyWithoutSubjectInput
}

input SubjectUpdateInput {
  code: String
  name: String
  description: String
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  subjectInfos: SubjectInfoUpdateManyInput
  prerequisites: SubjectUpdateManyInput
  notes: NoteUpdateManyWithoutSubjectInput
}

input SubjectUpdateManyDataInput {
  code: String
  name: String
  description: String
}

input SubjectUpdateManyInput {
  create: [SubjectCreateInput!]
  update: [SubjectUpdateWithWhereUniqueNestedInput!]
  upsert: [SubjectUpsertWithWhereUniqueNestedInput!]
  delete: [SubjectWhereUniqueInput!]
  connect: [SubjectWhereUniqueInput!]
  disconnect: [SubjectWhereUniqueInput!]
  deleteMany: [SubjectScalarWhereInput!]
  updateMany: [SubjectUpdateManyWithWhereNestedInput!]
}

input SubjectUpdateManyMutationInput {
  code: String
  name: String
  description: String
}

input SubjectUpdateManyWithWhereNestedInput {
  where: SubjectScalarWhereInput!
  data: SubjectUpdateManyDataInput!
}

input SubjectUpdateOneRequiredWithoutNotesInput {
  create: SubjectCreateWithoutNotesInput
  update: SubjectUpdateWithoutNotesDataInput
  upsert: SubjectUpsertWithoutNotesInput
  connect: SubjectWhereUniqueInput
}

input SubjectUpdateWithoutNotesDataInput {
  code: String
  name: String
  description: String
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  subjectInfos: SubjectInfoUpdateManyInput
  prerequisites: SubjectUpdateManyInput
}

input SubjectUpdateWithWhereUniqueNestedInput {
  where: SubjectWhereUniqueInput!
  data: SubjectUpdateDataInput!
}

input SubjectUpsertWithoutNotesInput {
  update: SubjectUpdateWithoutNotesDataInput!
  create: SubjectCreateWithoutNotesInput!
}

input SubjectUpsertWithWhereUniqueNestedInput {
  where: SubjectWhereUniqueInput!
  update: SubjectUpdateDataInput!
  create: SubjectCreateInput!
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
  faculty_every: UserWhereInput
  faculty_some: UserWhereInput
  faculty_none: UserWhereInput
  students_every: UserWhereInput
  students_some: UserWhereInput
  students_none: UserWhereInput
  subjectInfos_every: SubjectInfoWhereInput
  subjectInfos_some: SubjectInfoWhereInput
  subjectInfos_none: SubjectInfoWhereInput
  prerequisites_every: SubjectWhereInput
  prerequisites_some: SubjectWhereInput
  prerequisites_none: SubjectWhereInput
  notes_every: NoteWhereInput
  notes_some: NoteWhereInput
  notes_none: NoteWhereInput
  AND: [SubjectWhereInput!]
  OR: [SubjectWhereInput!]
  NOT: [SubjectWhereInput!]
}

input SubjectWhereUniqueInput {
  id: ID
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
  firstName: String
  lastName: String
  neptun: String!
  role: Role!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  password: String!
  email: String!
  firstName: String
  lastName: String
  neptun: String!
  role: Role!
}

input UserCreateManyInput {
  create: [UserCreateInput!]
  connect: [UserWhereUniqueInput!]
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
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  neptun_ASC
  neptun_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  password: String!
  email: String!
  firstName: String
  lastName: String
  neptun: String!
  role: Role!
}

input UserScalarWhereInput {
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
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
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
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
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
  firstName: String
  lastName: String
  neptun: String
  role: Role
}

input UserUpdateInput {
  password: String
  email: String
  firstName: String
  lastName: String
  neptun: String
  role: Role
}

input UserUpdateManyDataInput {
  password: String
  email: String
  firstName: String
  lastName: String
  neptun: String
  role: Role
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  password: String
  email: String
  firstName: String
  lastName: String
  neptun: String
  role: Role
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
  data: UserUpdateDataInput!
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithWhereUniqueNestedInput {
  where: UserWhereUniqueInput!
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
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
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
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
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