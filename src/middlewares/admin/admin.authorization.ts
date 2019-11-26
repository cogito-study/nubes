import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { addInstitutePermission } from '../institute/institute.permission';

export const createInstitute = async (
  resolve: FieldResolver<'Mutation', 'createInstitute'>,
  parent: {},
  args: { data: NexusGenInputs['CreateInstituteInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const response = await resolve(parent, args, context, info);
  const admins = await context.photon.users.findMany({
    where: {
      role: {
        name: 'ADMIN',
      },
    },
  });

  addInstitutePermission({
    permission: 'CREATE_DEPARTMENT',
    users: admins,
    instituteID: await response.id,
    context,
  });

  addInstitutePermission({
    permission: 'UPDATE_INSTITUTE',
    users: admins,
    instituteID: await response.id,
    context,
  });

  addInstitutePermission({
    permission: 'DELETE_INSTITUTE',
    users: admins,
    instituteID: await response.id,
    context,
  });

  return response;
};

export const updateDepartment = async (
  resolve: FieldResolver<'Mutation', 'updateDepartment'>,
  parent: {},
  args: {
    where: NexusGenInputs['WhereUniqueInput'];
    data: NexusGenInputs['UpdateDepartmentInput'];
  },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasDepartmentPermission({
      permission: 'UPDATE_DEPARTMENT',
      departmentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteDepartment = async (
  resolve: FieldResolver<'Mutation', 'deleteDepartment'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasDepartmentPermission({
      permission: 'DELETE_DEPARTMENT',
      departmentID: args.where.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new ForbiddenError(__('no_permission'));
};
