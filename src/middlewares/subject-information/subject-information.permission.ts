import { SubjectInformationPermissionType, User } from '@prisma/photon';
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
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          subjectInformationPermission: {
            type: permission,
            objects: { some: { id: subjectInformationID } },
          },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
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
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.subjectInformationPermissions.create({
    data: {
      type: permission,
      objects: {
        connect: {
          id: subjectInformationID,
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
