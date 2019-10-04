import { DepartmentPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasDepartmentPermission = async ({
  permission,
  departmentID,
  context,
}: {
  permission: DepartmentPermissionType;
  departmentID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.departmentPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              departmentPermission: {
                objects: { some: { id: departmentID } },
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
