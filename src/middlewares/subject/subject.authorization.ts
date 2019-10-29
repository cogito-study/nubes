import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasSubjectPermission } from './subject.permission';
import { addNotePermission } from '../note/note.permission';
import { addSubjectInformationPermission } from '../subject-information/subject-information.permission';

export const createNote = async (
  resolve: FieldResolver<'Mutation', 'createNote'>,
  parent: {},
  args: { data: NexusGenInputs['CreateNoteInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'CREATE_NOTE',
      subjectID: args.data.subject.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const note = await context.photon.notes.findOne({
      include: {
        subject: true,
      },
      where: {
        id: await response.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
      },
      where: {
        id: note.subject.id,
      },
    });

    addNotePermission({
      permission: 'UPDATE_NOTE',
      users: subject.teachers,
      noteID: note.id,
      context,
    });
    addNotePermission({
      permission: 'DELETE_NOTE',
      users: subject.teachers,
      noteID: note.id,
      context,
    });
    addNotePermission({
      permission: 'CREATE_SUGGESTION',
      users: [...subject.students, ...subject.teachers],
      noteID: note.id,
      context,
    });
    addNotePermission({
      permission: 'READ_NOTE',
      users: [...subject.students, ...subject.teachers],
      noteID: note.id,
      context,
    });
    return note;
  }

  throw new ForbiddenError(__('no_permission'));
};

export const createSubjectInformation = async (
  resolve: FieldResolver<'Mutation', 'createSubjectInformation'>,
  parent: {},
  args: { data: NexusGenInputs['CreateSubjectInformationInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'CREATE_SUBJECT_INFORMATION',
      subjectID: args.data.subject.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const subjectInformation = await context.photon.subjectInformations.findOne({
      include: {
        subject: true,
      },
      where: {
        id: await response.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
      },
      where: {
        id: subjectInformation.subject.id,
      },
    });
    addSubjectInformationPermission({
      permission: 'UPDATE_SUBJECT_INFORMATION',
      users: subject.teachers,
      subjectInformationID: subjectInformation.id,
      context,
    });
    addSubjectInformationPermission({
      permission: 'DELETE_SUBJECT_INFORMATION',
      users: subject.teachers,
      subjectInformationID: subjectInformation.id,
      context,
    });
    addSubjectInformationPermission({
      permission: 'READ_SUBJECT_INFORMATION',
      users: [...subject.teachers, ...subject.students],
      subjectInformationID: subjectInformation.id,
      context,
    });
    return subjectInformation;
  }
};
export const updateSubject = async (
  resolve: FieldResolver<'Mutation', 'updateSubject'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateSubjectInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'UPDATE_SUBJECT',
      subjectID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteSubject = async (
  resolve: FieldResolver<'Mutation', 'deleteOneSubject'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'DELETE_SUBJECT',
      subjectID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
