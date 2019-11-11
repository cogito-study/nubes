import { NoteHighlightPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasNoteHighlightPermission = async ({
  permission,
  noteHighlightID,
  context,
}: {
  permission: NoteHighlightPermissionType;
  noteHighlightID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.noteHighlightPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              noteHighlightPermission: {
                objects: { some: { id: noteHighlightID } },
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
