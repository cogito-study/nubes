import { extendType } from 'nexus';

export const NoteCommentThreadPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notecommentthreadpermissions({ alias: 'noteCommentThreadPermissions' });
  },
});
