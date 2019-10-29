import { SuggestionPermissionType, User } from '@generated/photon';
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

export const addSuggestionPermission = async ({
  permission,
  users,
  suggestionID,
  context,
}: {
  permission: SuggestionPermissionType;
  users: Array<User>;
  suggestionID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.suggestionPermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: suggestionID,
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
