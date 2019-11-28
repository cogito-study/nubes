import { InstitutePermissionType, User } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

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
  users: Array<User>;
  instituteID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.institutePermissions.create({
      data: {
        type: permission,
        object: {
          connect: {
            id: instituteID,
          },
        },
        users: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });
};
