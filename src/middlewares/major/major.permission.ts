import { MajorPermissionType, User } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

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
      AND: [
        {
          type: permission,
          object: { id: majorID },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
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
  users: Array<User>;
  majorID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.majorPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: majorID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
