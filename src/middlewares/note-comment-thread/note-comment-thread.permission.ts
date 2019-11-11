import { NoteCommentThreadPermissionType } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasNoteCommentThreadPermission = async ({
  permission,
  noteCommentThreadID,
  context,
}: {
  permission: NoteCommentThreadPermissionType;
  noteCommentThreadID: string;
  context: Context;
}) => {
  try {
    const permissions = await context.photon.noteCommentThreadPermissions.findMany({
      where: {
        AND: [
          { type: permission },
          {
            permission: {
              noteCommentThreadPermission: {
                objects: { some: { id: noteCommentThreadID } },
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
