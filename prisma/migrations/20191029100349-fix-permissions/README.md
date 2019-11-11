# Migration `20191028140349-fix-permissions`

This migration has been generated by kiralybalint <balint.kiraly@cogito.study> at 10/28/2019, 2:03:49 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Department" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "description" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Institute" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Language" (
  "code" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Note" (
  "content" text NOT NULL DEFAULT '' ,
  "contentHTML" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "description" text   ,
  "id" text NOT NULL  ,
  "noteCategory" text NOT NULL DEFAULT 'NOTE' ,
  "number" integer NOT NULL DEFAULT 0 ,
  "title" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteComment" (
  "content" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteCommentThread" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "position" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteHighlight" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "position" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."PasswordToken" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "token" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Subject" (
  "code" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "description" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."SubjectInformation" (
  "content" text NOT NULL DEFAULT '' ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "subtitle" text   ,
  "title" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Suggestion" (
  "approvedAt" timestamp(3)   ,
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "delta" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."User" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "email" text NOT NULL DEFAULT '' ,
  "firstName" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "identifier" text NOT NULL DEFAULT '' ,
  "isActive" boolean NOT NULL DEFAULT false ,
  "lastName" text NOT NULL DEFAULT '' ,
  "password" text NOT NULL DEFAULT '' ,
  "phoneNumber" text   ,
  "profilePictureURL" text   ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."ActivationToken" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "id" text NOT NULL  ,
  "token" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."ResetPasswordToken" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "email" text NOT NULL  ,
  "token" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("email")
);

CREATE TABLE "public"."UserRole" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "type" text NOT NULL DEFAULT 'USER' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."DepartmentPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_DEPARTMENT' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."InstitutePermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_INSTITUTE' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteCommentPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_NOTE_COMMENT' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteCommentThreadPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'DELETE_NOTE_COMMENT_THREAD' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NoteHighlightPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_NOTE_HIGHLIGHT' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."NotePermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'READ_NOTE' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."Permission" (
  "id" text NOT NULL  ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."SubjectPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'CREATE_SUBJECT_INFORMATION' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."SubjectInformationPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_SUBJECT_INFORMATION' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."SuggestionPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_SUGGESTION' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."UserPermission" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "deletedAt" timestamp(3)   ,
  "id" text NOT NULL  ,
  "type" text NOT NULL DEFAULT 'UPDATE_USER' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."UserGroup" (
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."_DepartmentPermissions" (
  "A" text   REFERENCES "public"."Department"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."DepartmentPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_InstituteUsers" (
  "A" text   REFERENCES "public"."Institute"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_InstitutePermissions" (
  "A" text   REFERENCES "public"."Institute"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."InstitutePermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NoteAuthors" (
  "A" text   REFERENCES "public"."Note"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NoteLikers" (
  "A" text   REFERENCES "public"."Note"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NotePermissions" (
  "A" text   REFERENCES "public"."Note"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."NotePermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_CommentLikers" (
  "A" text   REFERENCES "public"."NoteComment"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NoteCommentPermissions" (
  "A" text   REFERENCES "public"."NoteComment"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."NoteCommentPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NoteCommentThreadPermissions" (
  "A" text   REFERENCES "public"."NoteCommentThread"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."NoteCommentThreadPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_NoteHighlightPermissions" (
  "A" text   REFERENCES "public"."NoteHighlight"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."NoteHighlightPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SubjectTeachers" (
  "A" text   REFERENCES "public"."Subject"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SubjectStudents" (
  "A" text   REFERENCES "public"."Subject"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SubjectPermissions" (
  "A" text   REFERENCES "public"."Subject"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."SubjectPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SubjectInformationPermissions" (
  "A" text   REFERENCES "public"."SubjectInformation"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."SubjectInformationPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SuggestionLikers" (
  "A" text   REFERENCES "public"."Suggestion"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_SuggestionPermissions" (
  "A" text   REFERENCES "public"."Suggestion"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."SuggestionPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_UserGroups" (
  "A" text   REFERENCES "public"."User"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."UserGroup"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_UserPermissions" (
  "A" text   REFERENCES "public"."Permission"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_UserUserPermissions" (
  "A" text   REFERENCES "public"."User"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."UserPermission"("id") ON DELETE CASCADE
);

CREATE TABLE "public"."_UserGroupPermissions" (
  "A" text   REFERENCES "public"."Permission"("id") ON DELETE CASCADE,
  "B" text   REFERENCES "public"."UserGroup"("id") ON DELETE CASCADE
);

ALTER TABLE "public"."Department" ADD COLUMN "institute" text   REFERENCES "public"."Institute"("id") ON DELETE SET NULL,
ADD COLUMN "leader" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Note" ADD COLUMN "subject" text   REFERENCES "public"."Subject"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteComment" ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL,
ADD COLUMN "thread" text   REFERENCES "public"."NoteCommentThread"("id") ON DELETE SET NULL,
ADD COLUMN "threadReply" text   REFERENCES "public"."NoteCommentThread"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteCommentThread" ADD COLUMN "note" text   REFERENCES "public"."Note"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteHighlight" ADD COLUMN "note" text   REFERENCES "public"."Note"("id") ON DELETE SET NULL,
ADD COLUMN "user" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."PasswordToken" ADD COLUMN "user" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Subject" ADD COLUMN "department" text   REFERENCES "public"."Department"("id") ON DELETE SET NULL,
ADD COLUMN "language" text   REFERENCES "public"."Language"("id") ON DELETE SET NULL;

ALTER TABLE "public"."SubjectInformation" ADD COLUMN "subject" text   REFERENCES "public"."Subject"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Suggestion" ADD COLUMN "approvedBy" text   REFERENCES "public"."User"("id") ON DELETE SET NULL,
ADD COLUMN "author" text   REFERENCES "public"."User"("id") ON DELETE SET NULL,
ADD COLUMN "note" text   REFERENCES "public"."Note"("id") ON DELETE SET NULL;

ALTER TABLE "public"."User" ADD COLUMN "preferredLanguage" text   REFERENCES "public"."Language"("id") ON DELETE SET NULL,
ADD COLUMN "role" text   REFERENCES "public"."UserRole"("id") ON DELETE SET NULL;

ALTER TABLE "public"."ActivationToken" ADD COLUMN "user" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."ResetPasswordToken" ADD COLUMN "user" text   REFERENCES "public"."User"("id") ON DELETE SET NULL;

ALTER TABLE "public"."DepartmentPermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."InstitutePermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteCommentPermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteCommentThreadPermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NoteHighlightPermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."NotePermission" ADD COLUMN "permission" text   REFERENCES "public"."Permission"("id") ON DELETE SET NULL;

ALTER TABLE "public"."Permission" ADD COLUMN "subjectInformationPermission" text   REFERENCES "public"."SubjectInformationPermission"("id") ON DELETE SET NULL,
ADD COLUMN "subjectPermission" text   REFERENCES "public"."SubjectPermission"("id") ON DELETE SET NULL,
ADD COLUMN "suggestionPermission" text   REFERENCES "public"."SuggestionPermission"("id") ON DELETE SET NULL,
ADD COLUMN "userPermission" text   REFERENCES "public"."UserPermission"("id") ON DELETE SET NULL;

CREATE UNIQUE INDEX "Department.id" ON "public"."Department"("id")

CREATE UNIQUE INDEX "Institute.id" ON "public"."Institute"("id")

CREATE UNIQUE INDEX "Language.id" ON "public"."Language"("id")

CREATE UNIQUE INDEX "Language.code" ON "public"."Language"("code")

CREATE UNIQUE INDEX "Note.id" ON "public"."Note"("id")

CREATE UNIQUE INDEX "NoteComment.id" ON "public"."NoteComment"("id")

CREATE UNIQUE INDEX "NoteCommentThread.id" ON "public"."NoteCommentThread"("id")

CREATE UNIQUE INDEX "NoteHighlight.id" ON "public"."NoteHighlight"("id")

CREATE UNIQUE INDEX "PasswordToken.id" ON "public"."PasswordToken"("id")

CREATE UNIQUE INDEX "PasswordToken.token" ON "public"."PasswordToken"("token")

CREATE UNIQUE INDEX "Subject.id" ON "public"."Subject"("id")

CREATE UNIQUE INDEX "Subject.code" ON "public"."Subject"("code")

CREATE UNIQUE INDEX "SubjectInformation.id" ON "public"."SubjectInformation"("id")

CREATE UNIQUE INDEX "Suggestion.id" ON "public"."Suggestion"("id")

CREATE UNIQUE INDEX "User.id" ON "public"."User"("id")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "ActivationToken.id" ON "public"."ActivationToken"("id")

CREATE UNIQUE INDEX "ActivationToken.token" ON "public"."ActivationToken"("token")

CREATE UNIQUE INDEX "ResetPasswordToken.email" ON "public"."ResetPasswordToken"("email")

CREATE UNIQUE INDEX "ResetPasswordToken.token" ON "public"."ResetPasswordToken"("token")

CREATE UNIQUE INDEX "UserRole.id" ON "public"."UserRole"("id")

CREATE UNIQUE INDEX "DepartmentPermission.id" ON "public"."DepartmentPermission"("id")

CREATE UNIQUE INDEX "InstitutePermission.id" ON "public"."InstitutePermission"("id")

CREATE UNIQUE INDEX "NoteCommentPermission.id" ON "public"."NoteCommentPermission"("id")

CREATE UNIQUE INDEX "NoteCommentThreadPermission.id" ON "public"."NoteCommentThreadPermission"("id")

CREATE UNIQUE INDEX "NoteHighlightPermission.id" ON "public"."NoteHighlightPermission"("id")

CREATE UNIQUE INDEX "NotePermission.id" ON "public"."NotePermission"("id")

CREATE UNIQUE INDEX "Permission.id" ON "public"."Permission"("id")

CREATE UNIQUE INDEX "SubjectPermission.id" ON "public"."SubjectPermission"("id")

CREATE UNIQUE INDEX "SubjectInformationPermission.id" ON "public"."SubjectInformationPermission"("id")

CREATE UNIQUE INDEX "SuggestionPermission.id" ON "public"."SuggestionPermission"("id")

CREATE UNIQUE INDEX "UserPermission.id" ON "public"."UserPermission"("id")

CREATE UNIQUE INDEX "UserGroup.id" ON "public"."UserGroup"("id")

CREATE UNIQUE INDEX "_DepartmentPermissions_AB_unique" ON "public"."_DepartmentPermissions"("A","B")

CREATE UNIQUE INDEX "_InstituteUsers_AB_unique" ON "public"."_InstituteUsers"("A","B")

CREATE UNIQUE INDEX "_InstitutePermissions_AB_unique" ON "public"."_InstitutePermissions"("A","B")

CREATE UNIQUE INDEX "_NoteAuthors_AB_unique" ON "public"."_NoteAuthors"("A","B")

CREATE UNIQUE INDEX "_NoteLikers_AB_unique" ON "public"."_NoteLikers"("A","B")

CREATE UNIQUE INDEX "_NotePermissions_AB_unique" ON "public"."_NotePermissions"("A","B")

CREATE UNIQUE INDEX "_CommentLikers_AB_unique" ON "public"."_CommentLikers"("A","B")

CREATE UNIQUE INDEX "_NoteCommentPermissions_AB_unique" ON "public"."_NoteCommentPermissions"("A","B")

CREATE UNIQUE INDEX "_NoteCommentThreadPermissions_AB_unique" ON "public"."_NoteCommentThreadPermissions"("A","B")

CREATE UNIQUE INDEX "_NoteHighlightPermissions_AB_unique" ON "public"."_NoteHighlightPermissions"("A","B")

CREATE UNIQUE INDEX "_SubjectTeachers_AB_unique" ON "public"."_SubjectTeachers"("A","B")

CREATE UNIQUE INDEX "_SubjectStudents_AB_unique" ON "public"."_SubjectStudents"("A","B")

CREATE UNIQUE INDEX "_SubjectPermissions_AB_unique" ON "public"."_SubjectPermissions"("A","B")

CREATE UNIQUE INDEX "_SubjectInformationPermissions_AB_unique" ON "public"."_SubjectInformationPermissions"("A","B")

CREATE UNIQUE INDEX "_SuggestionLikers_AB_unique" ON "public"."_SuggestionLikers"("A","B")

CREATE UNIQUE INDEX "_SuggestionPermissions_AB_unique" ON "public"."_SuggestionPermissions"("A","B")

CREATE UNIQUE INDEX "_UserGroups_AB_unique" ON "public"."_UserGroups"("A","B")

CREATE UNIQUE INDEX "_UserPermissions_AB_unique" ON "public"."_UserPermissions"("A","B")

CREATE UNIQUE INDEX "_UserUserPermissions_AB_unique" ON "public"."_UserUserPermissions"("A","B")

CREATE UNIQUE INDEX "_UserGroupPermissions_AB_unique" ON "public"."_UserGroupPermissions"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191022170943-fix-schema..20191028140349-fix-permissions
--- datamodel.dml
+++ datamodel.dml
@@ -22,26 +22,28 @@
   PROFESSOR
 }
 model Department {
-  id          String    @default(cuid()) @id @unique
+  id          String                 @default(cuid()) @id @unique
   name        String
   description String
-  leader      User      @relation(name: "DepartmentLeader")
-  subjects    Subject[] @relation(name: "DepartmentSubjects")
-  institute   Institute @relation(name: "DepartmentInstitute")
-  createdAt   DateTime  @default(now())
-  updatedAt   DateTime  @updatedAt
+  leader      User                   @relation(name: "DepartmentLeader")
+  subjects    Subject[]              @relation(name: "DepartmentSubjects")
+  institute   Institute              @relation(name: "DepartmentInstitute")
+  permissions DepartmentPermission[] @relation(name: "DepartmentPermissions")
+  createdAt   DateTime               @default(now())
+  updatedAt   DateTime               @updatedAt
   deletedAt   DateTime?
 }
 model Institute {
-  id          String       @default(cuid()) @id @unique
+  id          String                @default(cuid()) @id @unique
   name        String
-  departments Department[] @relation(name: "DepartmentInstitute")
-  users       User[]       @relation(name: "InstituteUsers")
-  createdAt   DateTime     @default(now())
-  updatedAt   DateTime     @updatedAt
+  departments Department[]          @relation(name: "DepartmentInstitute")
+  users       User[]                @relation(name: "InstituteUsers")
+  permissions InstitutePermission[] @relation(name: "InstitutePermissions")
+  createdAt   DateTime              @default(now())
+  updatedAt   DateTime              @updatedAt
   deletedAt   DateTime?
 }
 model Language {
@@ -65,44 +67,48 @@
   authors        User[]              @relation(name: "NoteAuthors")
   likers         User[]              @relation(name: "NoteLikers")
   highlights     NoteHighlight[]     @relation(name: "NoteHighlights")
   subject        Subject             @relation(name: "SubjectNotes")
+  permissions    NotePermission[]    @relation(name: "NotePermissions")
   createdAt      DateTime            @default(now())
   updatedAt      DateTime            @updatedAt
   deletedAt      DateTime?
 }
 model NoteComment {
-  id          String             @default(cuid()) @id @unique
+  id          String                  @default(cuid()) @id @unique
   content     String
-  author      User               @relation(name: "CommentAuthor")
-  likers      User[]             @relation(name: "CommentLikers")
-  thread      NoteCommentThread? @relation(name: "NoteCommentThreadComment")
-  threadReply NoteCommentThread? @relation(name: "NoteCommentThreadReplies")
-  createdAt   DateTime           @default(now())
-  updatedAt   DateTime           @updatedAt
+  author      User                    @relation(name: "CommentAuthor")
+  likers      User[]                  @relation(name: "CommentLikers")
+  thread      NoteCommentThread?      @relation(name: "NoteCommentThreadComment")
+  threadReply NoteCommentThread?      @relation(name: "NoteCommentThreadReplies")
+  permissions NoteCommentPermission[] @relation(name: "NoteCommentPermissions")
+  createdAt   DateTime                @default(now())
+  updatedAt   DateTime                @updatedAt
   deletedAt   DateTime?
 }
 model NoteCommentThread {
-  id        String        @default(cuid()) @id @unique
-  position  String
-  comment   NoteComment   @relation(name: "NoteCommentThreadComment")
-  replies   NoteComment[] @relation(name: "NoteCommentThreadReplies")
-  note      Note          @relation(name: "NoteCommentThreads")
-  createdAt DateTime      @default(now())
-  updatedAt DateTime      @updatedAt
-  deletedAt DateTime?
+  id          String                        @default(cuid()) @id @unique
+  position    String
+  comment     NoteComment                   @relation(name: "NoteCommentThreadComment")
+  replies     NoteComment[]                 @relation(name: "NoteCommentThreadReplies")
+  note        Note                          @relation(name: "NoteCommentThreads")
+  permissions NoteCommentThreadPermission[] @relation(name: "NoteCommentThreadPermissions")
+  createdAt   DateTime                      @default(now())
+  updatedAt   DateTime                      @updatedAt
+  deletedAt   DateTime?
 }
 model NoteHighlight {
-  id        String    @default(cuid()) @id @unique
-  position  String
-  user      User      @relation(name: "UserNoteHighlights")
-  note      Note      @relation(name: "NoteHighlights")
-  createdAt DateTime  @default(now())
-  updatedAt DateTime  @updatedAt
-  deletedAt DateTime?
+  id          String                    @default(cuid()) @id @unique
+  position    String
+  user        User                      @relation(name: "UserNoteHighlights")
+  note        Note                      @relation(name: "NoteHighlights")
+  permissions NoteHighlightPermission[] @relation(name: "NoteHighlightPermissions")
+  createdAt   DateTime                  @default(now())
+  updatedAt   DateTime                  @updatedAt
+  deletedAt   DateTime?
 }
 model PasswordToken {
   id        String    @default(cuid()) @id @unique
@@ -123,35 +129,38 @@
   students     User[]               @relation(name: "SubjectStudents")
   informations SubjectInformation[] @relation(name: "SubjectInformations")
   notes        Note[]               @relation(name: "SubjectNotes")
   language     Language             @relation(name: "SubjectLanguage")
+  permissions  SubjectPermission[]  @relation(name: "SubjectPermissions")
   createdAt    DateTime             @default(now())
   updatedAt    DateTime             @updatedAt
   deletedAt    DateTime?
 }
 model SubjectInformation {
-  id        String    @default(cuid()) @id @unique
-  title     String
-  subtitle  String?
-  content   String
-  subject   Subject   @relation(name: "SubjectInformations")
-  createdAt DateTime  @default(now())
-  updatedAt DateTime  @updatedAt
-  deletedAt DateTime?
+  id          String                         @default(cuid()) @id @unique
+  title       String
+  subtitle    String?
+  content     String
+  subject     Subject                        @relation(name: "SubjectInformations")
+  permissions SubjectInformationPermission[] @relation(name: "SubjectInformationPermissions")
+  createdAt   DateTime                       @default(now())
+  updatedAt   DateTime                       @updatedAt
+  deletedAt   DateTime?
 }
 model Suggestion {
-  id         String    @default(cuid()) @id @unique
-  delta      String
-  approvedAt DateTime?
-  likers     User[]    @relation(name: "SuggestionLikers")
-  approvedBy User?     @relation(name: "SuggestionApprovedBy")
-  note       Note      @relation(name: "NoteSuggestions")
-  author     User      @relation(name: "SuggestionAuthor")
-  createdAt  DateTime  @default(now())
-  updatedAt  DateTime  @updatedAt
-  deletedAt  DateTime?
+  id          String                 @default(cuid()) @id @unique
+  delta       String
+  approvedAt  DateTime?
+  likers      User[]                 @relation(name: "SuggestionLikers")
+  approvedBy  User?                  @relation(name: "SuggestionApprovedBy")
+  note        Note                   @relation(name: "NoteSuggestions")
+  author      User                   @relation(name: "SuggestionAuthor")
+  permissions SuggestionPermission[] @relation(name: "SuggestionPermissions")
+  createdAt   DateTime               @default(now())
+  updatedAt   DateTime               @updatedAt
+  deletedAt   DateTime?
 }
 model User {
   id                  String              @default(cuid()) @id @unique
@@ -181,8 +190,9 @@
   departments         Department[]        @relation(name: "DepartmentLeader")
   institutes          Institute[]         @relation(name: "InstituteUsers")
   preferredLanguage   Language?           @relation(name: "UserPrefferedLanguage")
   permissions         Permission[]        @relation(name: "UserPermissions")
+  userPermissions     UserPermission[]    @relation(name: "UserUserPermissions")
   createdAt           DateTime            @default(now())
   updatedAt           DateTime            @updatedAt
   deletedAt           DateTime?
 }
@@ -212,9 +222,9 @@
 model DepartmentPermission {
   id        String                   @default(cuid()) @id @unique
   type      DepartmentPermissionType
-  objects   Department[]             @relation
+  objects   Department[]             @relation(name: "DepartmentPermissions")
   createdAt DateTime                 @default(now())
   updatedAt DateTime                 @updatedAt
   deletedAt DateTime?
 }
@@ -227,9 +237,9 @@
 model InstitutePermission {
   id        String                  @default(cuid()) @id @unique
   type      InstitutePermissionType
-  objects   Institute[]             @relation
+  objects   Institute[]             @relation(name: "InstitutePermissions")
   createdAt DateTime                @default(now())
   updatedAt DateTime                @updatedAt
   deletedAt DateTime?
 }
@@ -242,9 +252,9 @@
 model NoteCommentPermission {
   id        String                    @default(cuid()) @id @unique
   type      NoteCommentPermissionType
-  objects   NoteComment[]             @relation
+  objects   NoteComment[]             @relation(name: "NoteCommentPermissions")
   createdAt DateTime                  @default(now())
   updatedAt DateTime                  @updatedAt
   deletedAt DateTime?
 }
@@ -256,9 +266,9 @@
 model NoteCommentThreadPermission {
   id        String                          @default(cuid()) @id @unique
   type      NoteCommentThreadPermissionType
-  objects   NoteCommentThread[]             @relation
+  objects   NoteCommentThread[]             @relation(name: "NoteCommentThreadPermissions")
   createdAt DateTime                        @default(now())
   updatedAt DateTime                        @updatedAt
   deletedAt DateTime?
 }
@@ -269,9 +279,9 @@
 model NoteHighlightPermission {
   id        String                      @default(cuid()) @id @unique
   type      NoteHighlightPermissionType
-  objects   NoteHighlight[]             @relation
+  objects   NoteHighlight[]             @relation(name: "NoteHighlightPermissions")
   createdAt DateTime                    @default(now())
   updatedAt DateTime                    @updatedAt
   deletedAt DateTime?
 }
@@ -283,15 +293,16 @@
 model NotePermission {
   id        String             @default(cuid()) @id @unique
   type      NotePermissionType
-  objects   Note[]             @relation
+  objects   Note[]             @relation(name: "NotePermissions")
   createdAt DateTime           @default(now())
   updatedAt DateTime           @updatedAt
   deletedAt DateTime?
 }
 enum NotePermissionType {
+  READ_NOTE
   UPDATE_NOTE
   DELETE_NOTE
   CREATE_SUGGESTION
 }
@@ -314,24 +325,25 @@
 model SubjectPermission {
   id        String                @default(cuid()) @id @unique
   type      SubjectPermissionType
-  objects   Subject[]             @relation
+  objects   Subject[]             @relation(name: "SubjectPermissions")
   createdAt DateTime              @default(now())
   updatedAt DateTime              @updatedAt
   deletedAt DateTime?
 }
 enum SubjectPermissionType {
+  CREATE_SUBJECT_INFORMATION
   UPDATE_SUBJECT
   DELETE_SUBJECT
   CREATE_NOTE
 }
 model SubjectInformationPermission {
   id        String                           @default(cuid()) @id @unique
   type      SubjectInformationPermissionType
-  objects   SubjectInformation[]             @relation
+  objects   SubjectInformation[]             @relation(name: "SubjectInformationPermissions")
   createdAt DateTime                         @default(now())
   updatedAt DateTime                         @updatedAt
   deletedAt DateTime?
 }
@@ -343,9 +355,9 @@
 model SuggestionPermission {
   id        String                   @default(cuid()) @id @unique
   type      SuggestionPermissionType
-  objects   Suggestion[]             @relation
+  objects   Suggestion[]             @relation(name: "SuggestionPermissions")
   createdAt DateTime                 @default(now())
   updatedAt DateTime                 @updatedAt
   deletedAt DateTime?
 }
@@ -359,9 +371,9 @@
 model UserPermission {
   id        String             @default(cuid()) @id @unique
   type      UserPermissionType
-  objects   User[]             @relation
+  objects   User[]             @relation(name: "UserUserPermissions")
   createdAt DateTime           @default(now())
   updatedAt DateTime           @updatedAt
   deletedAt DateTime?
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191028140349-fix-permissions)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191028140349-fix-permissions'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```