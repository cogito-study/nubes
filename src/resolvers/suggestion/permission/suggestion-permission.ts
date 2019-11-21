import { objectType } from 'nexus';

export const SuggestionPermission = objectType({
  name: 'SuggestionPermission',
  definition(t) {
    t.model.id();
    t.model.type();

    t.model.objects({ type: 'Suggestion' });
    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
