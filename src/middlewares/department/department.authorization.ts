import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasDepartmentPermission } from './department.permission';

export const createSubject = async (
  resolve: FieldResolver<'Mutation', 'createSubject'>,
  parent: {},
  args: { data: NexusGenInputs['CreateSubjectInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasDepartmentPermission({
      permission: 'CREATE_SUBJECT',
      departmentID: args.data.department.id,
      context: context,
    })
  ) {
    return await resolve(parent, args, context, info);
  }

  throw new Error('403');
};

export const updateDepartment = async (
  resolve: FieldResolver<'Mutation', 'updateDepartment'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateDepartmentInput'] },
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

  throw new Error('403');
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

  throw new Error('403');
};
