import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasSubjectPermission } from './subject.permission';

export const createNote = async (
  resolve: FieldResolver<'Mutation', 'createOneNote'>,
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
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
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
