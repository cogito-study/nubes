import { NotePermissionType, User } from '@prisma/photon';
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
  noteID,
  context,
}: {
  permission: NotePermissionType;
  users: Array<User>;
  noteID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.notePermissions.create({
    data: {
      type: permission,
      object: {
        connect: {
          id: noteID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
