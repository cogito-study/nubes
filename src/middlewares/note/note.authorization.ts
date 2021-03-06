import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { publishSuggestionEvent } from '../../resolvers';
import { Context } from '../../types';
import { subjectPermissions } from '../permissions';
import { addSuggestionPermissions } from '../suggestion/suggestion.permission';
import { hasNotePermission } from './note.permission';

export const createSuggestion = async (
  resolve: FieldResolver<'Mutation', 'createSuggestion'>,
  parent: {},
  args: { data: NexusGenInputs['CreateSuggestionInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNotePermission({
      permission: 'CREATE_SUGGESTION',
      noteID: args.data.note.id,
      context,
    })
  ) {
    const response = await resolve(parent, args, context, info);

    const suggestion = await context.photon.suggestions.findOne({
      where: { id: await response.id },
      include: { note: true, author: true },
    });

    const note = await context.photon.notes.findOne({
      where: { id: suggestion.note.id },
      include: { subject: true },
    });

    const subject = await context.photon.subjects.findOne({
      where: { id: note.subject.id },
      include: { teachers: true, moderators: true, students: true },
    });

    await addSuggestionPermissions({
      permissions: subjectPermissions.notes.suggestions.permissions.teachers.others,
      suggestions: [suggestion],
      users: [
        ...subject.teachers.filter((teacher) => suggestion.author.id !== teacher.id),
        ...subject.moderators.filter((moderator) => suggestion.author.id !== moderator.id),
      ],
      context,
    });

    await addSuggestionPermissions({
      permissions: subjectPermissions.notes.suggestions.permissions.students.others,
      suggestions: [suggestion],
      users: subject.students.filter((student) => suggestion.author.id !== student.id),
      context,
    });

    if (
      subject.teachers.filter((teacher) => teacher.id === suggestion.author.id).length ||
      subject.moderators.filter((moderator) => moderator.id === suggestion.author.id).length
    ) {
      await addSuggestionPermissions({
        permissions: subjectPermissions.notes.suggestions.permissions.teachers.own,
        suggestions: [suggestion],
        users: [suggestion.author],
        context,
      });
    } else {
      await addSuggestionPermissions({
        permissions: subjectPermissions.notes.suggestions.permissions.students.own,
        suggestions: [suggestion],
        users: [suggestion.author],
        context,
      });
    }

    await publishSuggestionEvent('SUGGESTION_CREATE', suggestion, context);

    return response;
  }

  throw new ForbiddenError(__('no_permission'));
};

export const updateNote = async (
  resolve: FieldResolver<'Mutation', 'updateNote'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateNoteInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNotePermission({
      permission: 'UPDATE_NOTE',
      noteID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteNote = async (
  resolve: FieldResolver<'Mutation', 'deleteNote'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasNotePermission({
      permission: 'DELETE_NOTE',
      noteID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
