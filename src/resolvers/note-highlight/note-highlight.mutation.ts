import { extendType } from 'nexus';
import { CreateNoteHighlightInput, UpdateNoteHighlightInput } from './note-highlight.input';
import { WhereUniqueInput } from '../input';

export const NoteHighlightMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNoteHighlight', {
      type: 'NoteHighlight',
      args: { data: CreateNoteHighlightInput.asArg({ required: true }) },
      resolve: (_, { data: { user, note, ...rest } }, ctx) => {
        return ctx.photon.noteHighlights.create({
          data: {
            user: { connect: user },
            note: { connect: note },
            ...rest,
          },
        });
      },
    });

    t.field('updateNoteHighlight', {
      type: 'NoteHighlight',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateNoteHighlightInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.noteHighlights.update({
          where,
          data,
        });
      },
    });

    t.field('deleteNoteHighlight', {
      type: 'NoteHighlight',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.noteHighlights.delete({
          where,
        });
      },
    });
  },
});
