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
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          postCommentPermission: { type: permission, objects: { some: { id: postCommentID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
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
  users.forEach(async (user) => {
    await context.photon.postCommentPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: postCommentID,
          },
        },
        permissions: {
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
