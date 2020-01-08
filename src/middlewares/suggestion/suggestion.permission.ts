import { SuggestionPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasSuggestionPermission = async ({
  permission,
  suggestionID,
  context,
}: {
  permission: SuggestionPermissionType;
  suggestionID: string;
  context: Context;
}) => {
  const permissions = await context.photon.suggestionPermissions.findMany({
    where: {
      type: permission,
      object: { id: suggestionID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};

export const addSuggestionPermission = async ({
  permission,
  users,
  suggestions,
  context,
}: {
  permission: SuggestionPermissionType;
  users: Array<{ id: string }>;
  suggestions: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    suggestions.map(async (suggestion) => {
      await context.photon.suggestionPermissions.create({
        data: {
          type: permission,
          object: {
            connect: {
              id: suggestion.id,
            },
          },
          users: {
            connect: mapObjectsToIdentifiables(users),
          },
        },
      });
    }),
  );
};

export const addSuggestionPermissions = async ({
  permissions,
  users,
  suggestions,
  context,
}: {
  permissions: Array<SuggestionPermissionType>;
  users: Array<{ id: string }>;
  suggestions: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    permissions.map(
      async (permission) =>
        await addSuggestionPermission({ permission, users, suggestions, context }),
    ),
  );
};

export const deleteSuggestionPermission = async ({
  users,
  suggestions,
  context,
}: {
  users: Array<{ id: string }>;
  suggestions: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    suggestions.map(async (suggestion) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.suggestionPermissions.findMany({
            where: {
              object: suggestion,
              users: {
                some: { id: user.id },
              },
            },
            include: { users: true },
          });
          await Promise.all(
            permissions.map(async (permission) => {
              await context.photon.suggestionPermissions.update({
                where: { id: permission.id },
                data: { users: { disconnect: { id: user.id } } },
              });
            }),
          );
        }),
      );
    }),
  );
};
