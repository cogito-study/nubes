import { InstitutePermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasInstitutePermission = async ({
  permission,
  instituteID,
  context,
}: {
  permission: InstitutePermissionType;
  instituteID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.institutePermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              institutePermission: {
                objects: { some: { id: instituteID } },
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
