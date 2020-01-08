import { FacultyPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasFacultyPermission = async ({
  permission,
  facultyID,
  context,
}: {
  permission: FacultyPermissionType;
  facultyID: string;
  context: Context;
}) => {
  const permissions = await context.photon.facultyPermissions.findMany({
    where: {
      type: permission,
      object: { id: facultyID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};

export const addFacultyPermission = async ({
  permission,
  users,
  facultyID,
  context,
}: {
  permission: FacultyPermissionType;
  users: Array<{ id: string }>;
  facultyID: string;
  context: Context;
}) => {
  await context.photon.facultyPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: facultyID,
        },
      },
      users: {
        connect: mapObjectsToIdentifiables(users),
      },
    },
  });
};
