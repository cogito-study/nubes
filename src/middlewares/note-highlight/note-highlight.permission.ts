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
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          noteHighlightPermission: { type: permission, objects: { some: { id: noteHighlightID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};
