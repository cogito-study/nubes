import { PostPermissionType, User } from '@generated/photon';
import { Context } from '../../types';
import { getUserID } from '../../utils/authentication';

export const hasPostPermission = async ({
  permission,
  postID,
  context,
}: {
  permission: PostPermissionType;
  postID: string;
  context: Context;
}) => {
  const permissions = await context.photon.permissions.findMany({
    where: {
      AND: [
        {
          postPermission: { type: permission, objects: { some: { id: postID } } },
        },
        {
          users: { some: { id: getUserID(context) } },
        },
      ],
    },
  });
  return permissions.length !== 0;
};

export const addPostPermission = async ({
  permission,
  users,
  postID,
  context,
}: {
  permission: PostPermissionType;
  users: Array<User>;
  postID: string;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await context.photon.postPermissions.create({
    data: {
      type: permission,
      objects: {
        connect: {
          id: postID,
        },
      },
      permissions: {
        create: {
          users: {
            connect: mappedUsers,
          },
        },
      },
    },
  });
};
