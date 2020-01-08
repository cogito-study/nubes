import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { Middleware } from '../types';
import { activateRegistration, register } from './authentication.authorization';

const requireLogin = async (
  resolve: FieldResolver<'any', 'any'>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const id = getUserID(context);
  if (!id) {
    throw new ForbiddenError(__('unauthenticated'));
  }

  const user = await context.photon.users.findOne({ where: { id } });
  if (!user) {
    throw new ForbiddenError(__('unauthenticated'));
  }

  return await resolve(parent, args, context, info);
};

export const authenticationMiddlewares: Middleware = {
  Mutation: {
    register,
    activateRegistration,
    createDepartment: requireLogin,
    updateDepartment: requireLogin,
    deleteDepartment: requireLogin,
    createInstitute: requireLogin,
    updateInstitute: requireLogin,
    deleteInstitute: requireLogin,
    createNote: requireLogin,
    updateNote: requireLogin,
    deleteNote: requireLogin,
    createNoteComment: requireLogin,
    updateNoteComment: requireLogin,
    deleteNoteComment: requireLogin,
    createNoteCommentThread: requireLogin,
    deleteNoteCommentThread: requireLogin,
    createNoteHighlight: requireLogin,
    updateNoteHighlight: requireLogin,
    deleteNoteHighlight: requireLogin,
    createSubject: requireLogin,
    updateSubject: requireLogin,
    deleteSubject: requireLogin,
    createSubjectInformation: requireLogin,
    updateSubjectInformation: requireLogin,
    deleteSubjectInformation: requireLogin,
    createSuggestion: requireLogin,
    updateSuggestion: requireLogin,
    deleteSuggestion: requireLogin,
    updateUser: requireLogin,
    deleteUser: requireLogin,
  },
  Query: {
    me: requireLogin,
    department: requireLogin,
    institute: requireLogin,
    institutes: requireLogin,
    note: requireLogin,
    noteComment: requireLogin,
    noteCommentThread: requireLogin,
    noteHighlight: requireLogin,
    subject: requireLogin,
    subjectInformation: requireLogin,
    suggestion: requireLogin,
    user: requireLogin,
    users: requireLogin,
  },
};
