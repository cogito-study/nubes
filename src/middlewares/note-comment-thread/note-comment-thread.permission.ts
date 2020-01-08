import { NoteCommentThreadPermissionType } from '@prisma/photon';
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
  const permissions = await context.photon.noteCommentThreadPermissions.findMany({
    where: {
      type: permission,
      object: { id: noteCommentThreadID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};
