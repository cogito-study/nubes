import { extendType } from 'nexus';
import { CreateSubjectInput, UpdateSubjectInput } from './subject.input';
import { WhereUniqueInput } from '../input';

export const SubjectMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSubject', {
      type: 'Subject',
      args: { data: CreateSubjectInput.asArg({ required: true }) },
      resolve: (_, { data: { department, language, ...rest } }, ctx) => {
        return ctx.photon.subjects.create({
          data: {
            department: { connect: department },
            language: { connect: language },
            ...rest,
          },
        });
      },
    });

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
