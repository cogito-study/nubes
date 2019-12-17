import { InstitutePermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasInstitutePermission = async ({
  permission,
  instituteID,
  context,
}: {
  permission: InstitutePermissionType;
  instituteID: string;
  context: Context;
}) => {
  const permissions = await context.photon.institutePermissions.findMany({
    where: {
      type: permission,
      object: { id: instituteID },
      users: { some: { id: getUserID(context) } },
    },
  });
  return permissions.length !== 0;
};

export const addInstitutePermission = async ({
  permission,
  users,
  instituteID,
  context,
}: {
  permission: InstitutePermissionType;
  users: Array<{ id: string }>;
  instituteID: string;
  context: Context;
}) => {
  await context.photon.institutePermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: instituteID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
