import { UserPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasUserPermission = async ({
  permission,
  userID,
  context,
}: {
  permission: UserPermissionType;
  userID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.userPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              userPermission: {
                objects: { some: { id: userID } },
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

export const addUserPermission = async ({
  permission,
  users,
  userID,
  context,
}: {
  permission: UserPermissionType;
  users: Array<User>;
  userID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.userPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: userID,
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
