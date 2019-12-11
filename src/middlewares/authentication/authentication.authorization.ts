import { GraphQLResolveInfo } from 'graphql';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { addNotePermissions } from '../note/note.permission';
import { subjectPermissions } from '../permissions';
import { addSubjectPermissions } from '../subject/subject.permission';
import { addUserPermission } from '../user/user.permission';

export const register = async (
  resolve: FieldResolver<'Mutation', 'register'>,
  parent: {},
  args: { data: NexusGenInputs['RegisterUserInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const response = await resolve(parent, args, context, info);

  addUserPermission({
    permission: 'UPDATE_PROFILE',
    users: [{ id: await response.id }],
    userID: await response.id,
    context,
  });

  return response;
};

export const activateRegistration = async (
  resolve: FieldResolver<'Mutation', 'activateRegistration'>,
  parent: {},
  args: {
    data: NexusGenInputs['ActivateRegistrationInput'];
  },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const response = await resolve(parent, args, context, info);

  const userID = await response.id;

  const subjects = await context.photon.subjects.findMany({
    where: { students: { some: { id: userID } } },
    include: { notes: true, informations: true, posts: true },
  });

  const notes = subjects.map((subject) => subject.notes).reduce((a, b) => a.concat(b), []);

  await addSubjectPermissions({
    permissions: subjectPermissions.permissions.students,
    users: [{ id: userID }],
    subjects: args.data.subjects,
    context,
  });
  await addNotePermissions({
    permissions: subjectPermissions.notes.permissions.students,
    users: [{ id: userID }],
    notes: notes,
    context,
  });

  return response;
};
