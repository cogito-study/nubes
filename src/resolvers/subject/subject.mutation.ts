import { extendType } from 'nexus';
import { UpdateSubjectInput } from './subject.input';
import { WhereUniqueInput } from '../input';

export const SubjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateSubject', {
      type: 'Subject',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateSubjectInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.subjects.update({
          where,
          data,
        });
      },
    });

    t.field('deleteSubject', {
      type: 'Subject',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.subjects.delete({
          where,
        });
      },
    });
  },
});
