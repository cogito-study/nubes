import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { Middleware } from '../types';

const requireLogin = async (
  resolve: FieldResolver<'any', 'any'>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  const user = await context.photon.users.findOne({
    where: { id: getUserID(context) },
  });
  if (user !== null) return await resolve(parent, args, context, info);
  throw new ForbiddenError(__('unauthenticated'));
};

export const authenticationMiddlewares: Middleware = {
  Mutation: {
    uploadImage: requireLogin,
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
    language: requireLogin,
    languages: requireLogin,
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
