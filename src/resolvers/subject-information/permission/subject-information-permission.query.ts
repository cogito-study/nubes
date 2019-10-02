import { extendType } from 'nexus';

export const SubjectInformationPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.subjectinformationpermissions({ alias: 'subjectInformationPermissions' });
  },
});
