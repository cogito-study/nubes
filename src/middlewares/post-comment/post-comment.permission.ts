import { PostCommentPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasPostCommentPermission = async ({
  permission,
  postCommentID,
  context,
}: {
  permission: PostCommentPermissionType;
  postCommentID: string;
  context: Context;
}) => {
  const permissions = await context.photon.postCommentPermissions.findMany({
    where: {
      type: permission,
      object: { id: postCommentID },
      users: { some: { id: getUserID(context) } },
    },
  });
  return permissions.length !== 0;
};

export const addPostCommentPermission = async ({
  permission,
  users,
  postCommentID,
  context,
}: {
  permission: PostCommentPermissionType;
  users: Array<{ id: string }>;
  postCommentID: string;
  context: Context;
}) => {
  await context.photon.postCommentPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: postCommentID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
