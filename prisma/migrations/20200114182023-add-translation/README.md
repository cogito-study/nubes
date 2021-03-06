# Migration `20200114182023-add-translation`

This migration has been generated by kiralybalint <balint.kiraly@cogito.study> at 1/14/2020, 6:20:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."DepartmentTranslation" (
  "department" text NOT NULL  REFERENCES "public"."Department"("id") ON DELETE RESTRICT,
  "description" text NOT NULL DEFAULT '' ,
  "id" text NOT NULL  ,
  "language" text NOT NULL  REFERENCES "public"."Language"("id") ON DELETE RESTRICT,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."FacultyTranslation" (
  "faculty" text NOT NULL  REFERENCES "public"."Faculty"("id") ON DELETE RESTRICT,
  "id" text NOT NULL  ,
  "language" text NOT NULL  REFERENCES "public"."Language"("id") ON DELETE RESTRICT,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."InstituteTranslation" (
  "id" text NOT NULL  ,
  "institute" text NOT NULL  REFERENCES "public"."Institute"("id") ON DELETE RESTRICT,
  "language" text NOT NULL  REFERENCES "public"."Language"("id") ON DELETE RESTRICT,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

CREATE TABLE "public"."MajorTranslation" (
  "id" text NOT NULL  ,
  "language" text NOT NULL  REFERENCES "public"."Language"("id") ON DELETE RESTRICT,
  "major" text NOT NULL  REFERENCES "public"."Major"("id") ON DELETE RESTRICT,
  "name" text NOT NULL DEFAULT '' ,
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."Department" DROP COLUMN "description",
DROP COLUMN "name";

ALTER TABLE "public"."Faculty" DROP COLUMN "name";

ALTER TABLE "public"."Institute" DROP COLUMN "name";

ALTER TABLE "public"."Major" DROP COLUMN "name";

CREATE UNIQUE INDEX "DepartmentTranslation.id" ON "public"."DepartmentTranslation"("id")

CREATE UNIQUE INDEX "FacultyTranslation.id" ON "public"."FacultyTranslation"("id")

CREATE UNIQUE INDEX "InstituteTranslation.id" ON "public"."InstituteTranslation"("id")

CREATE UNIQUE INDEX "MajorTranslation.id" ON "public"."MajorTranslation"("id")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20200102200639-create-new-major-request..20200114182023-add-translation
--- datamodel.dml
+++ datamodel.dml
@@ -1,6 +1,6 @@
 datasource postgres {
-  url = "***"
+  url      = env("POSTGRESQL_URL")
   provider = "postgres"
 }
 generator photon {
@@ -23,43 +23,64 @@
   PROFESSOR
 }
 model Department {
-  id          String                 @default(cuid()) @id @unique
+  id           String                  @default(cuid()) @id @unique
+  translations DepartmentTranslation[] @relation(name: "DepartmentTranslations")
+  leader       User                    @relation(name: "DepartmentLeader")
+  subjects     Subject[]               @relation(name: "DepartmentSubjects")
+  institute    Institute               @relation(name: "DepartmentInstitute")
+  permissions  DepartmentPermission[]  @relation(name: "DepartmentPermissions")
+  createdAt    DateTime                @default(now())
+  updatedAt    DateTime                @updatedAt
+  deletedAt    DateTime?
+}
+
+model DepartmentTranslation {
+  id          String     @default(cuid()) @id @unique
   name        String
   description String
-  leader      User                   @relation(name: "DepartmentLeader")
-  subjects    Subject[]              @relation(name: "DepartmentSubjects")
-  institute   Institute              @relation(name: "DepartmentInstitute")
-  permissions DepartmentPermission[] @relation(name: "DepartmentPermissions")
-  createdAt   DateTime               @default(now())
-  updatedAt   DateTime               @updatedAt
-  deletedAt   DateTime?
+  department  Department @relation(name: "DepartmentTranslations")
+  language    Language
 }
 model Faculty {
-  id          String              @default(cuid()) @id @unique
-  name        String
-  institute   Institute           @relation(name: "InstituteFaculties")
-  majors      Major[]             @relation(name: "FacultyMajors")
-  permissions FacultyPermission[] @relation(name: "FacultyPermissions")
-  createdAt   DateTime            @default(now())
-  updatedAt   DateTime            @updatedAt
-  deletedAt   DateTime?
+  id           String               @default(cuid()) @id @unique
+  translations FacultyTranslation[] @relation(name: "FacultyTranslations")
+  institute    Institute            @relation(name: "InstituteFaculties")
+  majors       Major[]              @relation(name: "FacultyMajors")
+  permissions  FacultyPermission[]  @relation(name: "FacultyPermissions")
+  createdAt    DateTime             @default(now())
+  updatedAt    DateTime             @updatedAt
+  deletedAt    DateTime?
 }
+model FacultyTranslation {
+  id       String   @default(cuid()) @id @unique
+  name     String
+  faculty  Faculty  @relation(name: "FacultyTranslations")
+  language Language
+}
+
 model Institute {
-  id          String                @default(cuid()) @id @unique
-  name        String
-  faculties   Faculty[]             @relation(name: "InstituteFaculties")
-  departments Department[]          @relation(name: "DepartmentInstitute")
-  users       User[]                @relation(name: "InstituteUsers")
-  permissions InstitutePermission[] @relation(name: "InstitutePermissions")
-  createdAt   DateTime              @default(now())
-  updatedAt   DateTime              @updatedAt
-  deletedAt   DateTime?
+  id           String                 @default(cuid()) @id @unique
+  translations InstituteTranslation[] @relation(name: "InstituteTranslations")
+  faculties    Faculty[]              @relation(name: "InstituteFaculties")
+  departments  Department[]           @relation(name: "DepartmentInstitute")
+  users        User[]                 @relation(name: "InstituteUsers")
+  permissions  InstitutePermission[]  @relation(name: "InstitutePermissions")
+  createdAt    DateTime               @default(now())
+  updatedAt    DateTime               @updatedAt
+  deletedAt    DateTime?
 }
+model InstituteTranslation {
+  id        String    @default(cuid()) @id @unique
+  name      String
+  institute Institute @relation(name: "InstituteTranslations")
+  language  Language
+}
+
 model Language {
   id       String       @default(cuid()) @id @unique
   code     LanguageCode @unique
   name     String
@@ -67,19 +88,26 @@
   subjects Subject[]    @relation(name: "SubjectLanguage")
 }
 model Major {
-  id          String            @default(cuid()) @id @unique
-  name        String
-  faculty     Faculty           @relation(name: "FacultyMajors")
-  subjects    Subject[]         @relation(name: "MajorSubjects")
-  users       User[]            @relation(name: "MajorUsers")
-  permissions MajorPermission[] @relation(name: "MajorPermissions")
-  createdAt   DateTime          @default(now())
-  updatedAt   DateTime          @updatedAt
-  deletedAt   DateTime?
+  id           String             @default(cuid()) @id @unique
+  translations MajorTranslation[] @relation(name: "MajorTranslations")
+  faculty      Faculty            @relation(name: "FacultyMajors")
+  subjects     Subject[]          @relation(name: "MajorSubjects")
+  users        User[]             @relation(name: "MajorUsers")
+  permissions  MajorPermission[]  @relation(name: "MajorPermissions")
+  createdAt    DateTime           @default(now())
+  updatedAt    DateTime           @updatedAt
+  deletedAt    DateTime?
 }
+model MajorTranslation {
+  id       String   @default(cuid()) @id @unique
+  name     String
+  major    Major    @relation(name: "MajorTranslations")
+  language Language
+}
+
 model NewMajorRequest {
   id        String    @default(cuid()) @id @unique
   institute String
   major     String
```

## Photon Usage

You can use a specific Photon built for this migration (20200114182023-add-translation)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20200114182023-add-translation'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
