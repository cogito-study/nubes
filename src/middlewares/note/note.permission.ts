import { NotePermissionType } from '@generated/photon';
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
