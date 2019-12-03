import { FacultyPermissionType, User } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

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
      AND: [
        {
          type: permission,
          object: { id: facultyID },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
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
  users: Array<User>;
  facultyID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.facultyPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: facultyID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
