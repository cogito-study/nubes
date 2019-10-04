import { SuggestionPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasSuggestionPermission = async ({
  permission,
  suggestionID,
  context,
}: {
  permission: SuggestionPermissionType;
  suggestionID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.suggestionPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              suggestionPermission: {
                objects: { some: { id: suggestionID } },
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
