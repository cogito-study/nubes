import { NotePermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

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
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await Promise.all(
    notes.map(async (note) => {
      await context.photon.notePermissions.create({
        data: {
          type: permission,
          object: {
            connect: note,
          },
          users: {
            connect: mappedUsers,
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
    notes.map(async (note) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.notePermissions.findMany({
            where: {
              object: note,
              users: {
                some: user,
              },
            },
            include: { users: true },
          });
          await Promise.all(
            permissions.map(async (permission) => {
              await context.photon.notePermissions.update({
                where: { id: permission.id },
                data: { users: { disconnect: user } },
              });
            }),
          );
        }),
      );
    }),
  );
};
