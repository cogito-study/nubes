import { inputObjectType } from 'nexus';

export const CreateSuggestionInput = inputObjectType({
  name: 'CreateSuggestionInput',
  description: 'Input of create suggestion',
  definition(t) {
    t.string('delta', { required: true });
    t.field('note', { type: 'ConnectRelation', required: true });
  },
});

export const UpdateSuggestionInput = inputObjectType({
  name: 'UpdateSuggestionInput',
  description: 'Input of update suggestion',
  definition(t) {
    t.string('delta');
  },
});

export const SuggestionsInput = inputObjectType({
  name: 'SuggestionsInput',
  definition(t) {
    t.id('noteID');
  },
});
