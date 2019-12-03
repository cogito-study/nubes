import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import { UpdateSubjectInput } from './subject.input';

export const SubjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('updateSubject', {
      type: 'Subject',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateSubjectInput.asArg({ required: true }),
      },
      resolve: (_, { where, data: { students, teachers, ...rest } }, ctx) => {
        return ctx.photon.subjects.update({
          where,
          data: {
            students,
            teachers,
            ...rest,
          },
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
