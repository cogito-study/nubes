import { extendType } from 'nexus';
import { CreateNoteCommentInput, UpdateNoteCommentInput } from './note-comment.input';
import { WhereUniqueInput } from '../input';

export const NoteCommentMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNoteComment', {
      type: 'NoteComment',
      args: { data: CreateNoteCommentInput.asArg({ required: true }) },
      resolve: (_, { data: { author, ...rest } }, ctx) => {
        return ctx.photon.noteComments.create({
          data: {
            author: { connect: author },
            ...rest,
          },
        });
      },
    });

    t.field('updateNoteComment', {
      type: 'NoteComment',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateNoteCommentInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.noteComments.update({
          where,
          data,
        });
      },
    });

    t.field('deleteNoteComment', {
      type: 'NoteComment',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.noteComments.delete({
          where,
        });
      },
    });
  },
});
