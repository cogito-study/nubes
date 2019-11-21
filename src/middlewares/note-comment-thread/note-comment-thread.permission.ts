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
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          noteCommentThreadPermission: {
            type: permission,
            objects: { some: { id: noteCommentThreadID } },
          },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};
