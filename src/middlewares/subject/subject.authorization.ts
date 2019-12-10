import { ForbiddenError } from 'apollo-server';
import { GraphQLResolveInfo } from 'graphql';
import { __ } from 'i18n';
import { FieldResolver } from 'nexus';
import { NexusGenInputs } from '../../../generated/nexus-typegen';
import { Context } from '../../types';
import { addNotePermissions, deleteNotePermission } from '../note/note.permission';
import { subjectPermissions } from '../permissions';
import { addPostPermissions, deletePostPermission } from '../post/post.permission';
import {
  addSubjectInformationPermissions,
  deleteSubjectInformationPermission,
} from '../subject-information/subject-information.permission';
import {
  addSuggestionPermissions,
  deleteSuggestionPermission,
} from '../suggestion/suggestion.permission';
import {
  addSubjectPermissions,
  deleteSubjectPermission,
  hasSubjectPermission,
} from './subject.permission';

export const createNote = async (
  resolve: FieldResolver<'Mutation', 'createNote'>,
  parent: {},
  args: { data: NexusGenInputs['CreateNoteInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'CREATE_NOTE',
      subjectID: args.data.subject.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const note = await context.photon.notes.findOne({
      include: {
        subject: true,
      },
      where: {
        id: await response.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
      },
      where: {
        id: note.subject.id,
      },
    });

    await addNotePermissions({
      permissions: subjectPermissions.notes.permissions.students,
      users: subject.students,
      notes: [note],
      context,
    });

    await addNotePermissions({
      permissions: subjectPermissions.notes.permissions.teachers,
      users: subject.teachers,
      notes: [note],
      context,
    });
    return note;
  }

  throw new ForbiddenError(__('no_permission'));
};

export const createSubjectInformation = async (
  resolve: FieldResolver<'Mutation', 'createSubjectInformation'>,
  parent: {},
  args: { data: NexusGenInputs['CreateSubjectInformationInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'CREATE_SUBJECT_INFORMATION',
      subjectID: args.data.subject.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const subjectInformation = await context.photon.subjectInformations.findOne({
      include: {
        subject: true,
      },
      where: {
        id: await response.id,
      },
    });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
        moderators: true,
      },
      where: {
        id: subjectInformation.subject.id,
      },
    });

    await addSubjectInformationPermissions({
      permissions: subjectPermissions.subjectInformations.permissions.teachers,
      users: [...subject.teachers, ...subject.moderators],
      subjectInformations: [subjectInformation],
      context,
    });

    await addSubjectInformationPermissions({
      permissions: subjectPermissions.subjectInformations.permissions.students,
      users: subject.students,
      subjectInformations: [subjectInformation],
      context,
    });
    return subjectInformation;
  }
};
export const createPost = async (
  resolve: FieldResolver<'Mutation', 'createPost'>,
  parent: {},
  args: { data: NexusGenInputs['CreatePostInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'CREATE_POST',
      subjectID: args.data.subject.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const post = await context.photon.posts.findOne({ where: { id: await response.id } });
    const subject = await context.photon.subjects.findOne({
      include: {
        teachers: true,
        students: true,
        moderators: true,
      },
      where: {
        id: args.data.subject.id,
      },
    });

    await addPostPermissions({
      permissions: subjectPermissions.posts.permissions.teachers,
      users: [...subject.teachers, ...subject.moderators],
      posts: [post],
      context,
    });

    await addPostPermissions({
      permissions: subjectPermissions.posts.permissions.students,
      users: subject.students,
      posts: [post],
      context,
    });
    return response;
  }
};

// eslint-disable-next-line complexity
export const updateSubject = async (
  resolve: FieldResolver<'Mutation', 'updateSubject'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput']; data: NexusGenInputs['UpdateSubjectInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'UPDATE_SUBJECT',
      subjectID: args.where.id,
      context,
    })
  ) {
    const response = await resolve(parent, args, context, info);
    const { students, teachers, moderators } = args.data;

    const subject = await context.photon.subjects.findOne({
      where: { id: await response.id },
      include: { notes: true, informations: true, posts: true },
    });

    const notes = await context.photon.notes.findMany({
      where: { subject: { id: subject.id } },
      include: { suggestions: true },
    });

    const suggestions = notes.map((note) => note.suggestions).reduce((a, b) => a.concat(b), []);

    if (students) {
      if (students.disconnect) {
        await deleteSubjectPermission({ users: students.disconnect, subjects: [subject], context });
        await deleteNotePermission({ users: students.disconnect, notes: subject.notes, context });
        await deleteSuggestionPermission({ users: students.disconnect, suggestions, context });
        await deletePostPermission({ users: students.disconnect, posts: subject.posts, context });
        await deleteSubjectInformationPermission({
          users: students.disconnect,
          subjectInformations: subject.informations,
          context,
        });
      }
      if (students.connect) {
        await addSubjectPermissions({
          permissions: subjectPermissions.permissions.students,
          users: students.connect,
          subjects: [subject],
          context,
        });
        await addNotePermissions({
          permissions: subjectPermissions.notes.permissions.students,
          users: students.connect,
          notes: subject.notes,
          context,
        });
        await addSuggestionPermissions({
          permissions: subjectPermissions.notes.suggestions.permissions.students,
          users: students.connect,
          suggestions,
          context,
        });
        await addPostPermissions({
          permissions: subjectPermissions.posts.permissions.students,
          users: students.connect,
          posts: subject.posts,
          context,
        });
        await addSubjectInformationPermissions({
          permissions: subjectPermissions.subjectInformations.permissions.students,
          users: students.connect,
          subjectInformations: subject.informations,
          context,
        });
      }
    }

    if (teachers) {
      if (teachers.disconnect) {
        await deleteSubjectPermission({ users: teachers.disconnect, subjects: [subject], context });
        await deleteNotePermission({ users: teachers.disconnect, notes: subject.notes, context });
        await deleteSuggestionPermission({ users: teachers.disconnect, suggestions, context });
        await deletePostPermission({ users: teachers.disconnect, posts: subject.posts, context });
        await deleteSubjectInformationPermission({
          users: teachers.disconnect,
          subjectInformations: subject.informations,
          context,
        });
      }
      if (teachers.connect) {
        await addSubjectPermissions({
          permissions: subjectPermissions.permissions.teachers,
          users: teachers.connect,
          subjects: [subject],
          context,
        });
        await addNotePermissions({
          permissions: subjectPermissions.notes.permissions.teachers,
          users: teachers.connect,
          notes: subject.notes,
          context,
        });
        await addSuggestionPermissions({
          permissions: subjectPermissions.notes.suggestions.permissions.teachers,
          users: teachers.connect,
          suggestions,
          context,
        });
        await addPostPermissions({
          permissions: subjectPermissions.posts.permissions.teachers,
          users: teachers.connect,
          posts: subject.posts,
          context,
        });
        await addSubjectInformationPermissions({
          permissions: subjectPermissions.subjectInformations.permissions.teachers,
          users: teachers.connect,
          subjectInformations: subject.informations,
          context,
        });
      }
    }
    if (moderators) {
      if (moderators.disconnect) {
        await deleteSubjectPermission({
          users: moderators.disconnect,
          subjects: [subject],
          context,
        });
        await deleteNotePermission({ users: moderators.disconnect, notes: subject.notes, context });
        await deleteSuggestionPermission({ users: moderators.disconnect, suggestions, context });
        await deletePostPermission({ users: moderators.disconnect, posts: subject.posts, context });
        await deleteSubjectInformationPermission({
          users: moderators.disconnect,
          subjectInformations: subject.informations,
          context,
        });
      }
      if (moderators.connect) {
        await addSubjectPermissions({
          permissions: subjectPermissions.permissions.teachers,
          users: moderators.connect,
          subjects: [subject],
          context,
        });
        await addNotePermissions({
          permissions: subjectPermissions.notes.permissions.teachers,
          users: moderators.connect,
          notes: subject.notes,
          context,
        });
        await addSuggestionPermissions({
          permissions: subjectPermissions.notes.suggestions.permissions.teachers,
          users: moderators.connect,
          suggestions,
          context,
        });
        await addPostPermissions({
          permissions: subjectPermissions.posts.permissions.teachers,
          users: moderators.connect,
          posts: subject.posts,
          context,
        });
        await addSubjectInformationPermissions({
          permissions: subjectPermissions.subjectInformations.permissions.teachers,
          users: moderators.connect,
          subjectInformations: subject.informations,
          context,
        });
      }
    }
    return response;
  }

  throw new ForbiddenError(__('no_permission'));
};

export const deleteSubject = async (
  resolve: FieldResolver<'Mutation', 'deleteOneSubject'>,
  parent: {},
  args: { where: NexusGenInputs['WhereUniqueInput'] },
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (
    await hasSubjectPermission({
      permission: 'DELETE_SUBJECT',
      subjectID: args.where.id,
      context: context,
    })
  ) {
    const response = await resolve(parent, args, context, info);

    const subject = await context.photon.subjects.findOne({
      where: { id: await response.id },
      include: {
        students: true,
        teachers: true,
        moderators: true,
        posts: true,
        informations: true,
        notes: true,
      },
    });

    const notes = await context.photon.notes.findMany({
      where: { subject: { id: subject.id } },
      include: { suggestions: true },
    });

    const suggestions = notes.map((note) => note.suggestions).reduce((a, b) => a.concat(b), []);
    const { students, teachers, moderators } = subject;

    await deleteSubjectPermission({
      users: [...students, ...teachers, ...moderators],
      subjects: [subject],
      context,
    });
    await deleteNotePermission({
      users: [...students, ...teachers, ...moderators],
      notes: subject.notes,
      context,
    });
    await deleteSuggestionPermission({
      users: [...students, ...teachers, ...moderators],
      suggestions,
      context,
    });
    await deletePostPermission({
      users: [...students, ...teachers, ...moderators],
      posts: subject.posts,
      context,
    });
    await deleteSubjectInformationPermission({
      users: [...students, ...teachers, ...moderators],
      subjectInformations: subject.informations,
      context,
    });
    return response;
  }

  throw new ForbiddenError(__('no_permission'));
};
