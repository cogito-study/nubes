import { SubjectInformationPermissionType } from '@prisma/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';
import { mapObjectsToIdentifiables } from '../../utils/permission';

export const hasSubjectInformationPermission = async ({
  permission,
  subjectInformationID,
  context,
}: {
  permission: SubjectInformationPermissionType;
  subjectInformationID: string;
  context: Context;
}) => {
  const permissions = await context.photon.subjectInformationPermissions.findMany({
    where: {
      type: permission,
      object: { id: subjectInformationID },
      users: { some: { id: getUserID(context) } },
      deletedAt: null,
    },
  });
  return permissions.length !== 0;
};

export const addSubjectInformationPermission = async ({
  permission,
  users,
  subjectInformations,
  context,
}: {
  permission: SubjectInformationPermissionType;
  users: Array<{ id: string }>;
  subjectInformations: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    subjectInformations.map(async ({ id }) => {
      await context.photon.subjectInformationPermissions.create({
        data: {
          type: permission,
          object: {
            connect: { id },
          },
          users: {
            connect: mapObjectsToIdentifiables(users),
          },
        },
      });
    }),
  );
};

export const addSubjectInformationPermissions = async ({
  permissions,
  users,
  subjectInformations,
  context,
}: {
  permissions: Array<SubjectInformationPermissionType>;
  users: Array<{ id: string }>;
  subjectInformations: Array<{ id: string }>;
  context: Context;
}) => {
  permissions.map(
    async (permission) =>
      await addSubjectInformationPermission({ permission, users, subjectInformations, context }),
  );
};

export const deleteSubjectInformationPermission = async ({
  users,
  subjectInformations,
  context,
}: {
  users: Array<{ id: string }>;
  subjectInformations: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    subjectInformations.map(async ({ id }) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.subjectInformationPermissions.findMany({
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
              await context.photon.subjectInformationPermissions.update({
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
