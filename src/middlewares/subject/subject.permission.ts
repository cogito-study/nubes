import { SubjectPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasSubjectPermission = async ({
  permission,
  subjectID,
  context,
}: {
  permission: SubjectPermissionType;
  subjectID: string;
  context: Context;
}) => {
  const permissions = await context.photon.subjectPermissions.findMany({
    where: {
      AND: [
        { type: permission, object: { id: subjectID } },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};

export const addSubjectPermission = async ({
  permission,
  users,
  subjects,
  context,
}: {
  permission: SubjectPermissionType;
  users: Array<{ id: string }>;
  subjects: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    subjects.map(async (subject) => {
      await context.photon.subjectPermissions.create({
        data: {
          type: permission,
          object: {
            connect: { id: subject.id },
          },
          users: {
            connect: mapObjectsToIdentifiables(users),
          },
        },
      });
    }),
  );
};

export const addSubjectPermissions = async ({
  permissions,
  users,
  subjects,
  context,
}: {
  permissions: Array<SubjectPermissionType>;
  users: Array<{ id: string }>;
  subjects: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    permissions.map(
      async (permission) => await addSubjectPermission({ permission, users, subjects, context }),
    ),
  );
};

export const deleteSubjectPermission = async ({
  users,
  subjects,
  context,
}: {
  users: Array<{ id: string }>;
  subjects: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    subjects.map(async ({ id }) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.subjectPermissions.findMany({
            where: {
              object: { id },
              users: {
                some: { id: user.id },
              },
            },
            include: { users: true },
          });
          await Promise.all(
            permissions.map(async (permission) => {
              await context.photon.subjectPermissions.update({
                where: { id: permission.id },
                data: { users: { disconnect: { id: user.id } } },
              });
            }),
          );
        }),
      );
    }),
  );
};
