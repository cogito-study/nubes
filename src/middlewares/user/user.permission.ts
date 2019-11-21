import { UserPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasUserPermission = async ({
  permission,
  userID,
  context,
}: {
  permission: UserPermissionType;
  userID: string;
  context: Context;
}) => {
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          userPermission: { type: permission, objects: { some: { id: userID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
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
