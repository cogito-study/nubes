import { extendType } from 'nexus';

export const NoteCommentPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notecommentpermissions({ alias: 'noteCommentPermissions' });
  },
});
