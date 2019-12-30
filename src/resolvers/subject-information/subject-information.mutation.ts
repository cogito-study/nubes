import { extendType } from 'nexus';
import { WhereUniqueInput } from '../input';
import {
  CreateSubjectInformationInput,
  UpdateSubjectInformationInput,
} from './subject-information.input';

export const SubjectInformationMutation = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSubjectInformation', {
      type: 'SubjectInformation',
      args: { data: CreateSubjectInformationInput.asArg({ required: true }) },
      resolve: (_, { data: { subject, ...rest } }, ctx) => {
        return ctx.photon.subjectInformations.create({
          data: {
            subject: { connect: subject },
            ...rest,
          },
        });
      },
    });

    t.field('updateSubjectInformation', {
      type: 'SubjectInformation',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
        data: UpdateSubjectInformationInput.asArg({ required: true }),
      },
      resolve: (_, { where, data }, ctx) => {
        return ctx.photon.subjectInformations.update({
          where,
          data,
        });
      },
    });

    t.field('deleteSubjectInformation', {
      type: 'SubjectInformation',
      args: {
        where: WhereUniqueInput.asArg({ required: true }),
      },
      resolve: (_, { where }, ctx) => {
        return ctx.photon.subjectInformations.update({
          where,
          data: {
            deletedAt: new Date(),
          },
        });
      },
    });
  },
});
