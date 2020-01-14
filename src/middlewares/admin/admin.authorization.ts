import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { hasDepartmentPermission } from '../department/department.permission';

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

export const sendEmail = async (
  resolve: FieldResolver<'Query', 'sendEmail'>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const user = await context.photon.users.findOne({
    where: { id: getUserID(context) },
    include: {
      role: true,
    },
  });
  if (user && user.role.type == 'ADMIN') return await resolve(parent, args, context, info);
  throw new ForbiddenError(__('no_permission'));
};
