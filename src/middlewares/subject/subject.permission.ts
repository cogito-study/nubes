import { SubjectPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasSubjectPermission = async ({
  permission,
  subjectID,
  context,
}: {
  permission: SubjectPermissionType;
  subjectID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.subjectPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              subjectPermission: {
                objects: { some: { id: subjectID } },
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

export const addSubjectPermission = async ({
  permission,
  users,
  subjectID,
  context,
}: {
  permission: SubjectPermissionType;
  users: Array<User>;
  subjectID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.subjectPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: subjectID,
          },
        },
        permission: {
          create: {
            users: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    });
  });
};
