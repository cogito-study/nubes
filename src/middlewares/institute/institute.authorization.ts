import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { GraphQLResolveInfo } from 'graphql';
import { hasInstitutePermission } from './institute.permission';
import { ForbiddenError } from 'apollo-server';
import { __ } from 'i18n';
import { getUserID } from '../../utils';
import { addDepartmentPermission } from '../department/department.permission';

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
    const response = await resolve(parent, args, context, info);
    const department = await context.photon.departments.findOne({
      include: {
        leader: true,
      },
      where: {
        id: await response.id,
      },
    });
    addDepartmentPermission({
      permission: 'CREATE_SUBJECT',
      users: [department.leader],
      departmentID: department.id,
      context,
    });
    addDepartmentPermission({
      permission: 'UPDATE_DEPARTMENT',
      users: [department.leader],
      departmentID: department.id,
      context,
    });
    addDepartmentPermission({
      permission: 'DELETE_DEPARTMENT',
      users: [department.leader],
      departmentID: department.id,
      context,
    });

    addDepartmentPermission({
      permission: 'READ_DEPARTMENT',
      users: [department.leader],
      departmentID: department.id,
      context,
    });

    return department;
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

export const institutes = async (
  resolve: FieldResolver<'Query', 'institutes'>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  try {
    const user = await context.photon.users.findOne({
      where: { id: getUserID(context) },
      include: {
        role: true,
      },
    });
    if (user.role.type == 'ADMIN') return await resolve(parent, args, context, info);
  } catch {
    throw new ForbiddenError(__('no_permission'));
  }
  throw new ForbiddenError(__('no_permission'));
};
