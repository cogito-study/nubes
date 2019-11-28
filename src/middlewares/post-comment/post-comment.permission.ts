import { PostCommentPermissionType, User } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

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
  users: Array<User>;
  postCommentID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.postCommentPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: postCommentID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
