import { objectType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Subject = objectType({
  name: 'Subject',
  definition(t) {
    t.model.id();
    t.model.code();
    t.model.name();
    t.model.description();

    t.model.department({ type: 'Department' });
    t.model.moderators({ type: 'User' });
    t.model.language({ type: 'Language' });

    t.field('informations', {
      type: 'SubjectInformation',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.subjectInformations.findMany({
          where: {
            subject: { id },
            deletedAt: null,
          },
        });
      },
    });
    t.field('notes', {
      type: 'Note',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.notes.findMany({
          where: {
            subject: { id },
            deletedAt: null,
          },
        });
      },
    });
    t.field('posts', {
      type: 'Post',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.posts.findMany({
          where: {
            subject: { id },
            deletedAt: null,
          },
        });
      },
    });
    t.field('students', {
      type: 'User',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.users.findMany({
          where: {
            studiedSubjects: { some: { id } },
            deletedAt: null,
          },
        });
      },
    });
    t.field('teachers', {
      type: 'User',
      list: true,
      resolve: async ({ id }, _, context) => {
        return await context.photon.users.findMany({
          where: {
            teachedSubjects: { some: { id } },
            deletedAt: null,
          },
        });
      },
    });

    t.field('permissions', {
      type: 'SubjectPermissionType',
      list: true,
      resolve: async ({ id }, args, context) => {
        const permissions = await context.photon.subjectPermissions.findMany({
          where: {
            object: { id },
            users: { some: { id: getUserID(context) } },
            deletedAt: null,
          },
          select: {
            type: true,
          },
        });
        return permissions.map((p) => p.type);
      },
    });

    t.model.createdAt();
    t.model.updatedAt();
    t.model.deletedAt();
  },
});
