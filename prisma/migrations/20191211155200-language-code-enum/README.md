# Migration `20191211155200-language-code-enum`

This migration has been generated by kiralybalint <balint.kiraly@cogito.study> at 12/11/2019, 3:52:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191209153921-add-subject-moderators..20191211155200-language-code-enum
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgres {
-  url      = "***"
+  url      = env("POSTGRESQL_URL")
   provider = "postgres"
 }
 generator photon {
@@ -11,8 +11,13 @@
   NOTE
   CASE_STUDY
 }
+enum LanguageCode {
+  hu
+  en
+}
+
 enum UserRoleType {
   USER
   ADMIN
   PROFESSOR
@@ -54,13 +59,13 @@
   deletedAt   DateTime?
 }
 model Language {
-  id       String    @default(cuid()) @id @unique
-  code     String    @unique
+  id       String       @default(cuid()) @id @unique
+  code     LanguageCode @unique
   name     String
-  users    User[]    @relation(name: "UserPrefferedLanguage")
-  subjects Subject[] @relation(name: "SubjectLanguage")
+  users    User[]       @relation(name: "UserPrefferedLanguage")
+  subjects Subject[]    @relation(name: "SubjectLanguage")
 }
 model Major {
   id          String            @default(cuid()) @id @unique
@@ -513,6 +518,7 @@
 }
 enum UserPermissionType {
   UPDATE_USER
+  UPDATE_PROFILE
   DELETE_USER
 }
```

## Photon Usage

You can use a specific Photon built for this migration (20191211155200-language-code-enum)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191211155200-language-code-enum'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```