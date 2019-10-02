import { SubjectInformationPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

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
