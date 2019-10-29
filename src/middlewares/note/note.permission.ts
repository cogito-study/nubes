import { NotePermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasNotePermission = async ({
  permission,
  noteID,
  context,
}: {
  permission: NotePermissionType;
  noteID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.notePermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              notePermission: {
                objects: { some: { id: noteID } },
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
