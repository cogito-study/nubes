import { UserPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasUserPermission = async ({
  permission,
  userID,
  context,
}: {
  permission: UserPermissionType;
  userID: string;
  context: Context;
}) => {
  const permissions = await context.photon.userPermissions.findMany({
    where: {
      type: permission,
      object: { id: userID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
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
  users: Array<{ id: string }>;
  userID: string;
  context: Context;
}) => {
  await context.photon.userPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: userID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
