import { publishSuggestionEvent } from './../suggestion.subscription';
import Delta from 'quill-delta';
import { Context } from '../../../types';
import { getUserID } from '../../../utils';

export async function applySuggestion(suggestionId: string, ctx: Context) {
  const suggestion = await ctx.photon.suggestions.findOne({
    where: { id: suggestionId },
    include: { note: true },
  });
  const { note } = suggestion;
  const newContent = new Delta(JSON.parse(note.content)).compose(new Delta(JSON.parse(suggestion.delta)));

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

  for (const s of remainingSuggestions) {
    const updatedSuggestion = await ctx.photon.suggestions.update({
      where: { id: s.id },
      data: {
        delta: JSON.stringify(new Delta(JSON.parse(suggestion.delta)).transform(new Delta(JSON.parse(s.delta)))),
      },
      include: { note: true },
    });
    // Fix when this gets solved https://github.com/prisma-labs/nexus-prisma/issues/515
    // @ts-ignore
    if (updatedSuggestion.isActive) await publishSuggestionEvent('SUGGESTION_UPDATE', updatedSuggestion, ctx);
  }
}
