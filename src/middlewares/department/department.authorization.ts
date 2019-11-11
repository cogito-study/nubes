import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { hasDepartmentPermission } from './department.permission';
import { addSubjectPermission } from '../subject/subject.permission';

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
    const response = await resolve(parent, args, context, info);
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
      },
      where: {
        id: await response.id,
      },
    });

    addSubjectPermission({
      permission: 'CREATE_NOTE',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });
    addSubjectPermission({
      permission: 'CREATE_POST',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });
    addSubjectPermission({
      permission: 'UPDATE_SUBJECT',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });
    addSubjectPermission({
      permission: 'DELETE_SUBJECT',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });
    addSubjectPermission({
      permission: 'READ_SUBJECT',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });
    addSubjectPermission({
      permission: 'CREATE_SUBJECT_INFORMATION',
      users: subject.teachers,
      subjectID: subject.id,
      context,
    });

    return subject;
  }

  throw new ForbiddenError(__('no_permission'));
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
