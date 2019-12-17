import { DepartmentPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasDepartmentPermission = async ({
  permission,
  departmentID,
  context,
}: {
  permission: DepartmentPermissionType;
  departmentID: string;
  context: Context;
}) => {
  const permissions = await context.photon.departmentPermissions.findMany({
    where: {
      type: permission,
      object: { id: departmentID },
      users: { some: { id: getUserID(context) } },
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
  users: Array<{ id: string }>;
  departmentID: string;
  context: Context;
}) => {
  await context.photon.departmentPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: departmentID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
