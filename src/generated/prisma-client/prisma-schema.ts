export const typeDefs = /* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregateInstitute {
  count: Int!
}

type AggregateNote {
  count: Int!
}

type AggregatePasswordSetToken {
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
  text: String!
  locationInText: Json!
  createdAt: DateTime!
  updatedAt: DateTime!
  note: Note!
  author: User!
  replies(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  upvotes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  text: String!
  locationInText: Json!
  note: NoteCreateOneWithoutCommentsInput!
  author: UserCreateOneInput!
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
  text: String!
  locationInText: Json!
  author: UserCreateOneInput!
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
  locationInText_ASC
  locationInText_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  text: String!
  locationInText: Json!
  createdAt: DateTime!
  updatedAt: DateTime!
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
  text: String
  locationInText: Json
  note: NoteUpdateOneRequiredWithoutCommentsInput
  author: UserUpdateOneRequiredInput
  replies: CommentUpdateManyInput
  upvotes: UserUpdateManyInput
}

input CommentUpdateInput {
  text: String
  locationInText: Json
  note: NoteUpdateOneRequiredWithoutCommentsInput
  author: UserUpdateOneRequiredInput
  replies: CommentUpdateManyInput
  upvotes: UserUpdateManyInput
}

input CommentUpdateManyDataInput {
  text: String
  locationInText: Json
}

input CommentUpdateManyInput {
  create: [CommentCreateInput!]
  update: [CommentUpdateWithWhereUniqueNestedInput!]
  upsert: [CommentUpsertWithWhereUniqueNestedInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyMutationInput {
  text: String
  locationInText: Json
}

input CommentUpdateManyWithoutNoteInput {
  create: [CommentCreateWithoutNoteInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  set: [CommentWhereUniqueInput!]
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
  text: String
  locationInText: Json
  author: UserUpdateOneRequiredInput
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
  note: NoteWhereInput
  author: UserWhereInput
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

type Institute {
  id: ID!
  name: String!
  subjects(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject!]
}

type InstituteConnection {
  pageInfo: PageInfo!
  edges: [InstituteEdge]!
  aggregate: AggregateInstitute!
}

input InstituteCreateInput {
  name: String!
  subjects: SubjectCreateManyWithoutInstituteInput
}

input InstituteCreateOneWithoutSubjectsInput {
  create: InstituteCreateWithoutSubjectsInput
  connect: InstituteWhereUniqueInput
}

input InstituteCreateWithoutSubjectsInput {
  name: String!
}

type InstituteEdge {
  node: Institute!
  cursor: String!
}

enum InstituteOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type InstitutePreviousValues {
  id: ID!
  name: String!
}

type InstituteSubscriptionPayload {
  mutation: MutationType!
  node: Institute
  updatedFields: [String!]
  previousValues: InstitutePreviousValues
}

input InstituteSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: InstituteWhereInput
  AND: [InstituteSubscriptionWhereInput!]
  OR: [InstituteSubscriptionWhereInput!]
  NOT: [InstituteSubscriptionWhereInput!]
}

input InstituteUpdateInput {
  name: String
  subjects: SubjectUpdateManyWithoutInstituteInput
}

input InstituteUpdateManyMutationInput {
  name: String
}

input InstituteUpdateOneWithoutSubjectsInput {
  create: InstituteCreateWithoutSubjectsInput
  update: InstituteUpdateWithoutSubjectsDataInput
  upsert: InstituteUpsertWithoutSubjectsInput
  delete: Boolean
  disconnect: Boolean
  connect: InstituteWhereUniqueInput
}

input InstituteUpdateWithoutSubjectsDataInput {
  name: String
}

input InstituteUpsertWithoutSubjectsInput {
  update: InstituteUpdateWithoutSubjectsDataInput!
  create: InstituteCreateWithoutSubjectsInput!
}

input InstituteWhereInput {
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
  subjects_every: SubjectWhereInput
  subjects_some: SubjectWhereInput
  subjects_none: SubjectWhereInput
  AND: [InstituteWhereInput!]
  OR: [InstituteWhereInput!]
  NOT: [InstituteWhereInput!]
}

input InstituteWhereUniqueInput {
  id: ID
}

scalar Json

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createInstitute(data: InstituteCreateInput!): Institute!
  updateInstitute(data: InstituteUpdateInput!, where: InstituteWhereUniqueInput!): Institute
  updateManyInstitutes(data: InstituteUpdateManyMutationInput!, where: InstituteWhereInput): BatchPayload!
  upsertInstitute(where: InstituteWhereUniqueInput!, create: InstituteCreateInput!, update: InstituteUpdateInput!): Institute!
  deleteInstitute(where: InstituteWhereUniqueInput!): Institute
  deleteManyInstitutes(where: InstituteWhereInput): BatchPayload!
  createNote(data: NoteCreateInput!): Note!
  updateNote(data: NoteUpdateInput!, where: NoteWhereUniqueInput!): Note
  updateManyNotes(data: NoteUpdateManyMutationInput!, where: NoteWhereInput): BatchPayload!
  upsertNote(where: NoteWhereUniqueInput!, create: NoteCreateInput!, update: NoteUpdateInput!): Note!
  deleteNote(where: NoteWhereUniqueInput!): Note
  deleteManyNotes(where: NoteWhereInput): BatchPayload!
  createPasswordSetToken(data: PasswordSetTokenCreateInput!): PasswordSetToken!
  updatePasswordSetToken(data: PasswordSetTokenUpdateInput!, where: PasswordSetTokenWhereUniqueInput!): PasswordSetToken
  updateManyPasswordSetTokens(data: PasswordSetTokenUpdateManyMutationInput!, where: PasswordSetTokenWhereInput): BatchPayload!
  upsertPasswordSetToken(where: PasswordSetTokenWhereUniqueInput!, create: PasswordSetTokenCreateInput!, update: PasswordSetTokenUpdateInput!): PasswordSetToken!
  deletePasswordSetToken(where: PasswordSetTokenWhereUniqueInput!): PasswordSetToken
  deleteManyPasswordSetTokens(where: PasswordSetTokenWhereInput): BatchPayload!
  createSubject(data: SubjectCreateInput!): Subject!
  updateSubject(data: SubjectUpdateInput!, where: SubjectWhereUniqueInput!): Subject
  updateManySubjects(data: SubjectUpdateManyMutationInput!, where: SubjectWhereInput): BatchPayload!
  upsertSubject(where: SubjectWhereUniqueInput!, create: SubjectCreateInput!, update: SubjectUpdateInput!): Subject!
  deleteSubject(where: SubjectWhereUniqueInput!): Subject
  deleteManySubjects(where: SubjectWhereInput): BatchPayload!
  createSubjectInfo(data: SubjectInfoCreateInput!): SubjectInfo!
  updateSubjectInfo(data: SubjectInfoUpdateInput!, where: SubjectInfoWhereUniqueInput!): SubjectInfo
  updateManySubjectInfoes(data: SubjectInfoUpdateManyMutationInput!, where: SubjectInfoWhereInput): BatchPayload!
  upsertSubjectInfo(where: SubjectInfoWhereUniqueInput!, create: SubjectInfoCreateInput!, update: SubjectInfoUpdateInput!): SubjectInfo!
  deleteSubjectInfo(where: SubjectInfoWhereUniqueInput!): SubjectInfo
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
  text: Json!
  title: String!
  number: Int!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
  author: User!
  subject: Subject!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  type: NoteType!
  upvotes(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type NoteConnection {
  pageInfo: PageInfo!
  edges: [NoteEdge]!
  aggregate: AggregateNote!
}

input NoteCreateInput {
  text: Json!
  title: String!
  number: Int!
  description: String
  author: UserCreateOneInput!
  subject: SubjectCreateOneWithoutNotesInput!
  comments: CommentCreateManyWithoutNoteInput
  type: NoteType!
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
  text: Json!
  title: String!
  number: Int!
  description: String
  author: UserCreateOneInput!
  subject: SubjectCreateOneWithoutNotesInput!
  type: NoteType!
  upvotes: UserCreateManyInput
}

input NoteCreateWithoutSubjectInput {
  text: Json!
  title: String!
  number: Int!
  description: String
  author: UserCreateOneInput!
  comments: CommentCreateManyWithoutNoteInput
  type: NoteType!
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
  title_ASC
  title_DESC
  number_ASC
  number_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  type_ASC
  type_DESC
}

type NotePreviousValues {
  id: ID!
  text: Json!
  title: String!
  number: Int!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
  type: NoteType!
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
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
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
  type: NoteType
  type_not: NoteType
  type_in: [NoteType!]
  type_not_in: [NoteType!]
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
  text: Json
  title: String
  number: Int
  description: String
  author: UserUpdateOneRequiredInput
  subject: SubjectUpdateOneRequiredWithoutNotesInput
  comments: CommentUpdateManyWithoutNoteInput
  type: NoteType
  upvotes: UserUpdateManyInput
}

input NoteUpdateManyDataInput {
  text: Json
  title: String
  number: Int
  description: String
  type: NoteType
}

input NoteUpdateManyMutationInput {
  text: Json
  title: String
  number: Int
  description: String
  type: NoteType
}

input NoteUpdateManyWithoutSubjectInput {
  create: [NoteCreateWithoutSubjectInput!]
  delete: [NoteWhereUniqueInput!]
  connect: [NoteWhereUniqueInput!]
  set: [NoteWhereUniqueInput!]
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
  text: Json
  title: String
  number: Int
  description: String
  author: UserUpdateOneRequiredInput
  subject: SubjectUpdateOneRequiredWithoutNotesInput
  type: NoteType
  upvotes: UserUpdateManyInput
}

input NoteUpdateWithoutSubjectDataInput {
  text: Json
  title: String
  number: Int
  description: String
  author: UserUpdateOneRequiredInput
  comments: CommentUpdateManyWithoutNoteInput
  type: NoteType
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
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
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
  author: UserWhereInput
  subject: SubjectWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  type: NoteType
  type_not: NoteType
  type_in: [NoteType!]
  type_not_in: [NoteType!]
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

type PasswordSetToken {
  id: ID!
  token: String!
  email: String!
  createdAt: DateTime!
}

type PasswordSetTokenConnection {
  pageInfo: PageInfo!
  edges: [PasswordSetTokenEdge]!
  aggregate: AggregatePasswordSetToken!
}

input PasswordSetTokenCreateInput {
  token: String!
  email: String!
}

type PasswordSetTokenEdge {
  node: PasswordSetToken!
  cursor: String!
}

enum PasswordSetTokenOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  email_ASC
  email_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PasswordSetTokenPreviousValues {
  id: ID!
  token: String!
  email: String!
  createdAt: DateTime!
}

type PasswordSetTokenSubscriptionPayload {
  mutation: MutationType!
  node: PasswordSetToken
  updatedFields: [String!]
  previousValues: PasswordSetTokenPreviousValues
}

input PasswordSetTokenSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PasswordSetTokenWhereInput
  AND: [PasswordSetTokenSubscriptionWhereInput!]
  OR: [PasswordSetTokenSubscriptionWhereInput!]
  NOT: [PasswordSetTokenSubscriptionWhereInput!]
}

input PasswordSetTokenUpdateInput {
  token: String
  email: String
}

input PasswordSetTokenUpdateManyMutationInput {
  token: String
  email: String
}

input PasswordSetTokenWhereInput {
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
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
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
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [PasswordSetTokenWhereInput!]
  OR: [PasswordSetTokenWhereInput!]
  NOT: [PasswordSetTokenWhereInput!]
}

input PasswordSetTokenWhereUniqueInput {
  id: ID
  token: String
  email: String
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  institute(where: InstituteWhereUniqueInput!): Institute
  institutes(where: InstituteWhereInput, orderBy: InstituteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Institute]!
  institutesConnection(where: InstituteWhereInput, orderBy: InstituteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): InstituteConnection!
  note(where: NoteWhereUniqueInput!): Note
  notes(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Note]!
  notesConnection(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): NoteConnection!
  passwordSetToken(where: PasswordSetTokenWhereUniqueInput!): PasswordSetToken
  passwordSetTokens(where: PasswordSetTokenWhereInput, orderBy: PasswordSetTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PasswordSetToken]!
  passwordSetTokensConnection(where: PasswordSetTokenWhereInput, orderBy: PasswordSetTokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PasswordSetTokenConnection!
  subject(where: SubjectWhereUniqueInput!): Subject
  subjects(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject]!
  subjectsConnection(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubjectConnection!
  subjectInfo(where: SubjectInfoWhereUniqueInput!): SubjectInfo
  subjectInfoes(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubjectInfo]!
  subjectInfoesConnection(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SubjectInfoConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subject {
  id: ID!
  code: String!
  name: String!
  description: String!
  institute: Institute
  faculty(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  students(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
  info(where: SubjectInfoWhereInput, orderBy: SubjectInfoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubjectInfo!]
  notes(where: NoteWhereInput, orderBy: NoteOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Note!]
  prerequisites(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject!]
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
  institute: InstituteCreateOneWithoutSubjectsInput
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  info: SubjectInfoCreateManyWithoutSubjectInput
  notes: NoteCreateManyWithoutSubjectInput
  prerequisites: SubjectCreateManyInput
}

input SubjectCreateManyInput {
  create: [SubjectCreateInput!]
  connect: [SubjectWhereUniqueInput!]
}

input SubjectCreateManyWithoutInstituteInput {
  create: [SubjectCreateWithoutInstituteInput!]
  connect: [SubjectWhereUniqueInput!]
}

input SubjectCreateOneWithoutInfoInput {
  create: SubjectCreateWithoutInfoInput
  connect: SubjectWhereUniqueInput
}

input SubjectCreateOneWithoutNotesInput {
  create: SubjectCreateWithoutNotesInput
  connect: SubjectWhereUniqueInput
}

input SubjectCreateWithoutInfoInput {
  code: String!
  name: String!
  description: String!
  institute: InstituteCreateOneWithoutSubjectsInput
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  notes: NoteCreateManyWithoutSubjectInput
  prerequisites: SubjectCreateManyInput
}

input SubjectCreateWithoutInstituteInput {
  code: String!
  name: String!
  description: String!
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  info: SubjectInfoCreateManyWithoutSubjectInput
  notes: NoteCreateManyWithoutSubjectInput
  prerequisites: SubjectCreateManyInput
}

input SubjectCreateWithoutNotesInput {
  code: String!
  name: String!
  description: String!
  institute: InstituteCreateOneWithoutSubjectsInput
  faculty: UserCreateManyInput
  students: UserCreateManyInput
  info: SubjectInfoCreateManyWithoutSubjectInput
  prerequisites: SubjectCreateManyInput
}

type SubjectEdge {
  node: Subject!
  cursor: String!
}

type SubjectInfo {
  id: ID!
  title: String!
  subtitle: String
  text: String!
  subject: Subject!
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
  subject: SubjectCreateOneWithoutInfoInput!
}

input SubjectInfoCreateManyWithoutSubjectInput {
  create: [SubjectInfoCreateWithoutSubjectInput!]
  connect: [SubjectInfoWhereUniqueInput!]
}

input SubjectInfoCreateWithoutSubjectInput {
  title: String!
  subtitle: String
  text: String!
}

type SubjectInfoEdge {
  node: SubjectInfo!
  cursor: String!
}

enum SubjectInfoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  subtitle_ASC
  subtitle_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SubjectInfoPreviousValues {
  id: ID!
  title: String!
  subtitle: String
  text: String!
}

input SubjectInfoScalarWhereInput {
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

input SubjectInfoUpdateInput {
  title: String
  subtitle: String
  text: String
  subject: SubjectUpdateOneRequiredWithoutInfoInput
}

input SubjectInfoUpdateManyDataInput {
  title: String
  subtitle: String
  text: String
}

input SubjectInfoUpdateManyMutationInput {
  title: String
  subtitle: String
  text: String
}

input SubjectInfoUpdateManyWithoutSubjectInput {
  create: [SubjectInfoCreateWithoutSubjectInput!]
  delete: [SubjectInfoWhereUniqueInput!]
  connect: [SubjectInfoWhereUniqueInput!]
  set: [SubjectInfoWhereUniqueInput!]
  disconnect: [SubjectInfoWhereUniqueInput!]
  update: [SubjectInfoUpdateWithWhereUniqueWithoutSubjectInput!]
  upsert: [SubjectInfoUpsertWithWhereUniqueWithoutSubjectInput!]
  deleteMany: [SubjectInfoScalarWhereInput!]
  updateMany: [SubjectInfoUpdateManyWithWhereNestedInput!]
}

input SubjectInfoUpdateManyWithWhereNestedInput {
  where: SubjectInfoScalarWhereInput!
  data: SubjectInfoUpdateManyDataInput!
}

input SubjectInfoUpdateWithoutSubjectDataInput {
  title: String
  subtitle: String
  text: String
}

input SubjectInfoUpdateWithWhereUniqueWithoutSubjectInput {
  where: SubjectInfoWhereUniqueInput!
  data: SubjectInfoUpdateWithoutSubjectDataInput!
}

input SubjectInfoUpsertWithWhereUniqueWithoutSubjectInput {
  where: SubjectInfoWhereUniqueInput!
  update: SubjectInfoUpdateWithoutSubjectDataInput!
  create: SubjectInfoCreateWithoutSubjectInput!
}

input SubjectInfoWhereInput {
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
  subject: SubjectWhereInput
  AND: [SubjectInfoWhereInput!]
  OR: [SubjectInfoWhereInput!]
  NOT: [SubjectInfoWhereInput!]
}

input SubjectInfoWhereUniqueInput {
  id: ID
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
  institute: InstituteUpdateOneWithoutSubjectsInput
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  info: SubjectInfoUpdateManyWithoutSubjectInput
  notes: NoteUpdateManyWithoutSubjectInput
  prerequisites: SubjectUpdateManyInput
}

input SubjectUpdateInput {
  code: String
  name: String
  description: String
  institute: InstituteUpdateOneWithoutSubjectsInput
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  info: SubjectInfoUpdateManyWithoutSubjectInput
  notes: NoteUpdateManyWithoutSubjectInput
  prerequisites: SubjectUpdateManyInput
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
  set: [SubjectWhereUniqueInput!]
  disconnect: [SubjectWhereUniqueInput!]
  deleteMany: [SubjectScalarWhereInput!]
  updateMany: [SubjectUpdateManyWithWhereNestedInput!]
}

input SubjectUpdateManyMutationInput {
  code: String
  name: String
  description: String
}

input SubjectUpdateManyWithoutInstituteInput {
  create: [SubjectCreateWithoutInstituteInput!]
  delete: [SubjectWhereUniqueInput!]
  connect: [SubjectWhereUniqueInput!]
  set: [SubjectWhereUniqueInput!]
  disconnect: [SubjectWhereUniqueInput!]
  update: [SubjectUpdateWithWhereUniqueWithoutInstituteInput!]
  upsert: [SubjectUpsertWithWhereUniqueWithoutInstituteInput!]
  deleteMany: [SubjectScalarWhereInput!]
  updateMany: [SubjectUpdateManyWithWhereNestedInput!]
}

input SubjectUpdateManyWithWhereNestedInput {
  where: SubjectScalarWhereInput!
  data: SubjectUpdateManyDataInput!
}

input SubjectUpdateOneRequiredWithoutInfoInput {
  create: SubjectCreateWithoutInfoInput
  update: SubjectUpdateWithoutInfoDataInput
  upsert: SubjectUpsertWithoutInfoInput
  connect: SubjectWhereUniqueInput
}

input SubjectUpdateOneRequiredWithoutNotesInput {
  create: SubjectCreateWithoutNotesInput
  update: SubjectUpdateWithoutNotesDataInput
  upsert: SubjectUpsertWithoutNotesInput
  connect: SubjectWhereUniqueInput
}

input SubjectUpdateWithoutInfoDataInput {
  code: String
  name: String
  description: String
  institute: InstituteUpdateOneWithoutSubjectsInput
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  notes: NoteUpdateManyWithoutSubjectInput
  prerequisites: SubjectUpdateManyInput
}

input SubjectUpdateWithoutInstituteDataInput {
  code: String
  name: String
  description: String
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  info: SubjectInfoUpdateManyWithoutSubjectInput
  notes: NoteUpdateManyWithoutSubjectInput
  prerequisites: SubjectUpdateManyInput
}

input SubjectUpdateWithoutNotesDataInput {
  code: String
  name: String
  description: String
  institute: InstituteUpdateOneWithoutSubjectsInput
  faculty: UserUpdateManyInput
  students: UserUpdateManyInput
  info: SubjectInfoUpdateManyWithoutSubjectInput
  prerequisites: SubjectUpdateManyInput
}

input SubjectUpdateWithWhereUniqueNestedInput {
  where: SubjectWhereUniqueInput!
  data: SubjectUpdateDataInput!
}

input SubjectUpdateWithWhereUniqueWithoutInstituteInput {
  where: SubjectWhereUniqueInput!
  data: SubjectUpdateWithoutInstituteDataInput!
}

input SubjectUpsertWithoutInfoInput {
  update: SubjectUpdateWithoutInfoDataInput!
  create: SubjectCreateWithoutInfoInput!
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

input SubjectUpsertWithWhereUniqueWithoutInstituteInput {
  where: SubjectWhereUniqueInput!
  update: SubjectUpdateWithoutInstituteDataInput!
  create: SubjectCreateWithoutInstituteInput!
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
  institute: InstituteWhereInput
  faculty_every: UserWhereInput
  faculty_some: UserWhereInput
  faculty_none: UserWhereInput
  students_every: UserWhereInput
  students_some: UserWhereInput
  students_none: UserWhereInput
  info_every: SubjectInfoWhereInput
  info_some: SubjectInfoWhereInput
  info_none: SubjectInfoWhereInput
  notes_every: NoteWhereInput
  notes_some: NoteWhereInput
  notes_none: NoteWhereInput
  prerequisites_every: SubjectWhereInput
  prerequisites_some: SubjectWhereInput
  prerequisites_none: SubjectWhereInput
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
  institute(where: InstituteSubscriptionWhereInput): InstituteSubscriptionPayload
  note(where: NoteSubscriptionWhereInput): NoteSubscriptionPayload
  passwordSetToken(where: PasswordSetTokenSubscriptionWhereInput): PasswordSetTokenSubscriptionPayload
  subject(where: SubjectSubscriptionWhereInput): SubjectSubscriptionPayload
  subjectInfo(where: SubjectInfoSubscriptionWhereInput): SubjectInfoSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  neptun: String
  isActive: Boolean!
  password: String!
  firstName: String
  lastName: String
  phone: String
  role: UserRole!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  neptun: String
  isActive: Boolean
  password: String!
  firstName: String
  lastName: String
  phone: String
  role: UserRole
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
  email_ASC
  email_DESC
  neptun_ASC
  neptun_DESC
  isActive_ASC
  isActive_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  phone_ASC
  phone_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  neptun: String
  isActive: Boolean!
  password: String!
  firstName: String
  lastName: String
  phone: String
  role: UserRole!
}

enum UserRole {
  USER
  PROFESSOR
  ADMIN
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
  isActive: Boolean
  isActive_not: Boolean
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
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  role: UserRole
  role_not: UserRole
  role_in: [UserRole!]
  role_not_in: [UserRole!]
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
  email: String
  neptun: String
  isActive: Boolean
  password: String
  firstName: String
  lastName: String
  phone: String
  role: UserRole
}

input UserUpdateInput {
  email: String
  neptun: String
  isActive: Boolean
  password: String
  firstName: String
  lastName: String
  phone: String
  role: UserRole
}

input UserUpdateManyDataInput {
  email: String
  neptun: String
  isActive: Boolean
  password: String
  firstName: String
  lastName: String
  phone: String
  role: UserRole
}

input UserUpdateManyInput {
  create: [UserCreateInput!]
  update: [UserUpdateWithWhereUniqueNestedInput!]
  upsert: [UserUpsertWithWhereUniqueNestedInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyMutationInput {
  email: String
  neptun: String
  isActive: Boolean
  password: String
  firstName: String
  lastName: String
  phone: String
  role: UserRole
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
  isActive: Boolean
  isActive_not: Boolean
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
  phone: String
  phone_not: String
  phone_in: [String!]
  phone_not_in: [String!]
  phone_lt: String
  phone_lte: String
  phone_gt: String
  phone_gte: String
  phone_contains: String
  phone_not_contains: String
  phone_starts_with: String
  phone_not_starts_with: String
  phone_ends_with: String
  phone_not_ends_with: String
  role: UserRole
  role_not: UserRole
  role_in: [UserRole!]
  role_not_in: [UserRole!]
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`