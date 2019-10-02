import { NoteCommentPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils';

export const hasNoteCommentPermission = async ({
  permission,
  noteCommentID,
  context,
}: {
  permission: NoteCommentPermissionType;
  noteCommentID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.noteCommentPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              noteCommentPermission: {
                objects: { some: { id: noteCommentID } },
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
