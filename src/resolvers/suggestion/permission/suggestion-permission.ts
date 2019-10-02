import { objectType, enumType } from 'nexus';
import { SuggestionPermissionType } from '@generated/photon';

export const SuggestionPermission = objectType({
  name: 'SuggestionPermission',
  definition(t) {
    t.model.id();
    // TODO: Fix when prisma2 supports enums
    t.field('type', {
      type: enumType({
        name: 'SuggestionPermissionTypeEnum',
        members: SuggestionPermissionType,
      }),
      resolve: ({ type }) => type,
    });

    t.model.objects({ type: 'Suggestion' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
