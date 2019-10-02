import { extendType } from 'nexus';

export const SubjectPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subjectpermissions({ alias: 'subjectPermissions' });
  },
});
