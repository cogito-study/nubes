import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreateNoteInput, UpdateNoteInput } from './note.input';

export const NoteMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNote', {
      type: 'Note',
      args: { data: CreateNoteInput.asArg({ required: true }) },
      resolve: (_, { data: { subject, ...rest } }, ctx) => {
        return ctx.photon.notes.create({
          data: {
            subject: { connect: subject },
            ...rest,
          },
        });
      },
    });

    t.field('updateNote', {
      type: 'Note',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateNoteInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.notes.update({
          where,
          data,
        });
      },
    });

    t.field('deleteNote', {
      type: 'Note',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.notes.delete({
          where,
        });
      },
    });
  },
});
