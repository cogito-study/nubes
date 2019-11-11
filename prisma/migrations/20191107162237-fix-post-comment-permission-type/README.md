# Migration `20191107162237-fix-post-comment-permission-type`

This migration has been generated by kiralybalint <balint.kiraly@cogito.study> at 11/7/2019, 4:22:37 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "_CommentLikers_AB_unique" ON "public"."_CommentLikers"("A","B")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration 20191107153638-add-social-feed..20191107162237-fix-post-comment-permission-type
--- datamodel.dml
+++ datamodel.dml
@@ -357,13 +357,13 @@
   userPermission               UserPermission?               @relation
 }
 model PostCommentPermission {
-  id        String             @default(cuid()) @id @unique
-  type      PostPermissionType
-  objects   PostComment[]      @relation(name: "PostCommentPermissions")
-  createdAt DateTime           @default(now())
-  updatedAt DateTime           @updatedAt
+  id        String                    @default(cuid()) @id @unique
+  type      PostCommentPermissionType
+  objects   PostComment[]             @relation(name: "PostCommentPermissions")
+  createdAt DateTime                  @default(now())
+  updatedAt DateTime                  @updatedAt
   deletedAt DateTime?
 }
 enum PostCommentPermissionType {
```

## Photon Usage

You can use a specific Photon built for this migration (20191107162237-fix-post-comment-permission-type)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191107162237-fix-post-comment-permission-type'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```