import { PostCommentPermissionType, User } from '@generated/photon';
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
  try {
    const permissions = await context.photon.postCommentPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              postCommentPermission: {
                objects: { some: { id: postCommentID } },
              },
            },
          },
          {
            permission: {
              users: { some: { id: getUserID(context) } },
            },
          },
        ],
      },
    });
    return permissions.length !== 0;
  } catch (error) {
    return false;
  }
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
  users.forEach(async (user) => {
    await context.photon.postCommentPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: postCommentID,
          },
        },
        permission: {
          create: {
            users: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    });
  });
};
