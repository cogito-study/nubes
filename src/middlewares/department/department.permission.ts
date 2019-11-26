import { DepartmentPermissionType, User } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasDepartmentPermission = async ({
  permission,
  departmentID,
  context,
}: {
  permission: DepartmentPermissionType;
  departmentID: string;
  context: Context;
}) => {
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          departmentPermission: { type: permission, objects: { some: { id: departmentID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};

export const addDepartmentPermission = async ({
  permission,
  users,
  departmentID,
  context,
}: {
  permission: DepartmentPermissionType;
  users: Array<User>;
  departmentID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.departmentPermissions.create({
    data: {
      type: permission,
      objects: {
        connect: {
          id: departmentID,
        },
      },
      permissions: {
        create: {
          users: {
            connect: mappedUsers,
          },
        },
      },
    },
  });
};
