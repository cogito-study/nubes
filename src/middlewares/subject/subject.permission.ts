import { SubjectPermissionType, User } from '@prisma/photon';
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
  const permissions = await context.photon.subjectPermissions.findMany({
    where: {
      AND: [
        { type: permission, object: { id: subjectID } },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
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
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.subjectPermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: subjectID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
