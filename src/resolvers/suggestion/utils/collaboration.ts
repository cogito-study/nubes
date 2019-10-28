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
  const availableSuggestions = await ctx.photon.suggestions.findMany({
    where: { AND: { note: { id: note.id }, approvedAt: null, rejectedAt: null } },
  });
  availableSuggestions.forEach(
    async (s) =>
      await ctx.photon.suggestions.update({
        where: { id: s.id },
        data: {
          delta: JSON.stringify(new Delta(JSON.parse(suggestion.delta)).transform(new Delta(JSON.parse(s.delta)))),
        },
      }),
  );
}
