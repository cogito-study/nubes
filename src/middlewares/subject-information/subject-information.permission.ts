import { SubjectInformationPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasSubjectInformationPermission = async ({
  permission,
  subjectInformationID,
  context,
}: {
  permission: SubjectInformationPermissionType;
  subjectInformationID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.subjectInformationPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              subjectInformationPermission: {
                objects: { some: { id: subjectInformationID } },
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

export const addSubjectInformationPermission = async ({
  permission,
  users,
  subjectInformationID,
  context,
}: {
  permission: SubjectInformationPermissionType;
  users: Array<User>;
  subjectInformationID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.subjectInformationPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: subjectInformationID,
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
