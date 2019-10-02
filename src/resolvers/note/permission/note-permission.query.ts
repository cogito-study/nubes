import { extendType } from 'nexus';

export const NotePermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.notepermissions({ alias: 'notePermissions' });
  },
});
