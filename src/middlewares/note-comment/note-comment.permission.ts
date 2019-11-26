import { NoteCommentPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasNoteCommentPermission = async ({
  permission,
  noteCommentID,
  context,
}: {
  permission: NoteCommentPermissionType;
  noteCommentID: string;
  context: Context;
}) => {
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          noteCommentPermission: { type: permission, objects: { some: { id: noteCommentID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};
