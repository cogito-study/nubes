import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasInstitutePermission } from './institute.permission';
import { ForbiddenError } from 'apollo-server';
import { __ } from 'i18n';

export const createDepartment = async (
  resolve: FieldResolver<'Mutation', 'createDepartment'>,
  parent: {},
  args: { data: NexusGenInputs['CreateDepartmentInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasInstitutePermission({
      permission: 'CREATE_DEPARTMENT',
      instituteID: args.data.institute.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const updateInstitute = async (
  resolve: FieldResolver<'Mutation', 'updateInstitute'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateInstituteInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasInstitutePermission({
      permission: 'UPDATE_INSTITUTE',
      instituteID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteInstitute = async (
  resolve: FieldResolver<'Mutation', 'deleteInstitute'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasInstitutePermission({
      permission: 'DELETE_INSTITUTE',
      instituteID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
