import { NotePermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasNotePermission = async ({
  permission,
  noteID,
  context,
}: {
  permission: NotePermissionType;
  noteID: string;
  context: Context;
}) => {
  const permissions = await context.photon.notePermissions.findMany({
    where: {
      type: permission,
      object: { id: noteID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};

export const addNotePermission = async ({
  permission,
  users,
  notes,
  context,
}: {
  permission: NotePermissionType;
  users: Array<{ id: string }>;
  notes: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    notes.map(async ({ id }) => {
      await context.photon.notePermissions.create({
        data: {
          type: permission,
          object: {
            connect: { id },
          },
          users: {
            connect: mapObjectsToIdentifiables(users),
          },
        },
      });
    }),
  );
};

export const addNotePermissions = async ({
  permissions,
  users,
  notes,
  context,
}: {
  permissions: Array<NotePermissionType>;
  users: Array<{ id: string }>;
  notes: Array<{ id: string }>;
  context: Context;
}) =>
  await Promise.all(
    permissions.map(
      async (permission) => await addNotePermission({ permission, users, notes, context }),
    ),
  );

export const deleteNotePermission = async ({
  users,
  notes,
  context,
}: {
  users: Array<{ id: string }>;
  notes: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    notes.map(async ({ id }) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.notePermissions.findMany({
            where: {
              object: { id },
              users: {
                some: { id: user.id },
              },
            },
            include: { users: true },
          });
          await Promise.all(
            permissions.map(async (permission) => {
              await context.photon.notePermissions.update({
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
