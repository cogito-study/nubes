import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { CreateNoteCommentThreadInput } from './note-comment-thread.input';

export const NoteCommentThreadMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createNoteCommentThread', {
      type: 'NoteCommentThread',
      args: { data: CreateNoteCommentThreadInput.asArg({ required: true }) },
      resolve: (_, { data: { comment, note, ...rest } }, ctx) => {
        return ctx.photon.noteCommentThreads.create({
          data: {
            comment: { connect: comment },
            note: { connect: note },
            ...rest,
          },
        });
      },
    });

    t.field('deleteNoteCommentThread', {
      type: 'NoteCommentThread',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.noteCommentThreads.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});
