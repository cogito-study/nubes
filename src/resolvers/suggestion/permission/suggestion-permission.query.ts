import { extendType } from 'nexus';

export const SuggestionPermissionQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.suggestionpermissions({ alias: 'suggestionPermissions' });
  },
});
