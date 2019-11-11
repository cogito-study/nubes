import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasSubjectInformationPermission } from './subject-information.permission';

export const updateSubjectInformation = async (
  resolve: FieldResolver<'Mutation', 'updateSubjectInformation'>,
  parent: {},
  args: {
    where: NexusGenInputs['WhereUniqueInput'];
    data: NexusGenInputs['UpdateSubjectInformationInput'];
  },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectInformationPermission({
      permission: 'UPDATE_SUBJECT_INFORMATION',
      subjectInformationID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteSubjectInformation = async (
  resolve: FieldResolver<'Mutation', 'deleteSubjectInformation'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectInformationPermission({
      permission: 'DELETE_SUBJECT_INFORMATION',
      subjectInformationID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
