import Delta from 'quill-delta';
import { Context } from '../../../types';
import { getUserID } from '../../../utils/authentication';
import { publishSuggestionEvent } from './../suggestion.subscription';
import { isActiveSuggestion } from './is-active';

export async function applySuggestion(suggestionId: string, ctx: Context) {
  const suggestion = await ctx.photon.suggestions.findOne({
    where: { id: suggestionId },
    include: { note: true },
  });
  const { note } = suggestion;
  const newContent = new Delta(JSON.parse(note.content)).compose(
    new Delta(JSON.parse(suggestion.delta)),
  );

  await ctx.photon.suggestions.update({
    where: { id: suggestionId },
    data: { approvedAt: new Date(), approvedBy: { connect: { id: getUserID(ctx) } } },
  });

  await ctx.photon.notes.update({
    where: { id: note.id },
    data: { content: JSON.stringify(newContent) },
  });

  const remainingSuggestions = await ctx.photon.suggestions.findMany({
    where: {
      AND: [{ note: { id: note.id } }, { NOT: { id: suggestion.id } }],
    },
  });

  for (const remainingSuggestion of remainingSuggestions) {
    const transformedDelta = new Delta(JSON.parse(suggestion.delta)).transform(
      new Delta(JSON.parse(remainingSuggestion.delta)),
    );

    const updatedSuggestion = await ctx.photon.suggestions.update({
      where: { id: remainingSuggestion.id },
      data: { delta: JSON.stringify(transformedDelta) },
      include: { note: true },
    });

    if (isActiveSuggestion(updatedSuggestion))
      await publishSuggestionEvent('SUGGESTION_UPDATE', updatedSuggestion, ctx);
  }
}
