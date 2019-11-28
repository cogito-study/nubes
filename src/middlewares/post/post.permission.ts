import { PostPermissionType, User } from '@prisma/photon';
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
  const permissions = await context.photon.postPermissions.findMany({
    where: {
      AND: [
        {
          type: permission,
          object: { id: postID },
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
      object: {
        connect: {
          id: postID,
        },
      },
      users: {
        connect: mappedUsers,
      },
    },
  });
};
