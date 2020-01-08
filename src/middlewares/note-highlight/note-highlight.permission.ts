import { NoteHighlightPermissionType } from '@prisma/photon';
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
  const permissions = await context.photon.noteHighlightPermissions.findMany({
    where: {
      type: permission,
      object: { id: noteHighlightID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};
