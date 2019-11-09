import { PostPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasPostPermission = async ({
  permission,
  postID,
  context,
}: {
  permission: PostPermissionType;
  postID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.postPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              postPermission: {
                objects: { some: { id: postID } },
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

export const addPostPermission = async ({
  permission,
  users,
  postID,
  context,
}: {
  permission: PostPermissionType;
  users: Array<User>;
  postID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.postPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: postID,
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
