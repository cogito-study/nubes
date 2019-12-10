import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
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
      include: {
        note: true,
        author: true,
      },
      where: {
        id: await response.id,
      },
    });
    const note = await context.photon.notes.findOne({
      include: {
        subject: true,
      },
      where: {
        id: suggestion.note.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
        moderators: true,
      },
      where: {
        id: note.subject.id,
      },
    });
    addSuggestionPermissions({
      permissions: subjectPermissions.notes.suggestions.permissions.teachers,
      users: [...subject.teachers, ...subject.moderators],
      suggestions: [suggestion],
      context,
    });
    addSuggestionPermissions({
      permissions: subjectPermissions.notes.suggestions.permissions.students,
      users: subject.students,
      suggestions: [suggestion],
      context,
    });
    return suggestion;
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
