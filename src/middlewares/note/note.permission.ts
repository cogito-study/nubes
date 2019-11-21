import { NotePermissionType, User } from '@generated/photon';
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
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          notePermission: { type: permission, objects: { some: { id: noteID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};

export const addNotePermission = async ({
  permission,
  users,
  noteID,
  context,
}: {
  permission: NotePermissionType;
  users: Array<User>;
  noteID: string;
  context: Context;
}) => {
  users.forEach(async (user) => {
    await context.photon.notePermissions.create({
      data: {
        type: permission,
        objects: {
          connect: {
            id: noteID,
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
