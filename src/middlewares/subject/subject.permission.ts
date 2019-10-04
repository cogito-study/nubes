import { SubjectPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

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
