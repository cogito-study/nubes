import { MajorPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasMajorPermission = async ({
  permission,
  majorID,
  context,
}: {
  permission: MajorPermissionType;
  majorID: string;
  context: Context;
}) => {
  const permissions = await context.photon.majorPermissions.findMany({
    where: {
      type: permission,
      object: { id: majorID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};

export const addMajorPermission = async ({
  permission,
  users,
  majorID,
  context,
}: {
  permission: MajorPermissionType;
  users: Array<{ id: string }>;
  majorID: string;
  context: Context;
}) => {
  await context.photon.majorPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: majorID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
