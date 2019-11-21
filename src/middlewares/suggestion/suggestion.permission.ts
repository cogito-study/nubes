import { SuggestionPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasSuggestionPermission = async ({
  permission,
  suggestionID,
  context,
}: {
  permission: SuggestionPermissionType;
  suggestionID: string;
  context: Context;
}) => {
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          suggestionPermission: { type: permission, objects: { some: { id: suggestionID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
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
        permissions: {
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
