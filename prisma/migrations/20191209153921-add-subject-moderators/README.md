# Migration `20191209143221-add-subject-moderators`

This migration has been generated by kiralybalint <balint.kiraly@cogito.study> at 12/9/2019, 2:32:22 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_SubjectModerators" (
  "A" text NOT NULL  REFERENCES "public"."Subject"("id") ON DELETE CASCADE,
  "B" text NOT NULL  REFERENCES "public"."User"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "_SubjectModerators_AB_unique" ON "public"."_SubjectModerators"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191205193805-auth-refactor..20191209143221-add-subject-moderators
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgres {
-  url = "***"
+  url      = env("POSTGRESQL_URL")
   provider = "postgres"
 }
 generator photon {
@@ -143,8 +143,9 @@
   code         String               @unique
   name         String
   description  String
   department   Department           @relation(name: "DepartmentSubjects")
+  moderators   User[]               @relation(name: "SubjectModerators")
   teachers     User[]               @relation(name: "SubjectTeachers")
   students     User[]               @relation(name: "SubjectStudents")
   informations SubjectInformation[] @relation(name: "SubjectInformations")
   notes        Note[]               @relation(name: "SubjectNotes")
@@ -201,8 +202,9 @@
   notes               Note[]              @relation(name: "NoteAuthors")
   noteHighlights      NoteHighlight[]     @relation(name: "UserNoteHighlights")
   suggestions         Suggestion[]        @relation(name: "SuggestionAuthor")
   approvedSuggestions Suggestion[]        @relation(name: "SuggestionApprovedBy")
+  moderatedSubjects   Subject[]           @relation(name: "SubjectModerators")
   teachedSubjects     Subject[]           @relation(name: "SubjectTeachers")
   studiedSubjects     Subject[]           @relation(name: "SubjectStudents")
   likedNotes          Note[]              @relation(name: "NoteLikers")
   noteComments        NoteComment[]       @relation(name: "NoteCommentAuthor")
```

## Photon Usage

You can use a specific Photon built for this migration (20191209143221-add-subject-moderators)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191209143221-add-subject-moderators'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
