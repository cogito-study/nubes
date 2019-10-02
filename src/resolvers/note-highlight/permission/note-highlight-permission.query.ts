import { extendType } from 'nexus';

export const NoteHighlightPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notehighlightpermissions({ alias: 'noteHighlightPermissions' });
  },
});
