import { PostPermissionType } from '@prisma/photon';
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
  posts,
  context,
}: {
  permission: PostPermissionType;
  users: Array<{ id: string }>;
  posts: Array<{ id: string }>;
  context: Context;
}) => {
  const mappedUsers = users.map((user) => {
    return {
      id: user.id,
    };
  });
  await Promise.all(
    posts.map(async (post) => {
      await context.photon.postPermissions.create({
        data: {
          type: permission,
          object: {
            connect: {
              id: post.id,
            },
          },
          users: {
            connect: mappedUsers,
          },
        },
      });
    }),
  );
};

export const addPostPermissions = async ({
  permissions,
  users,
  posts,
  context,
}: {
  permissions: Array<PostPermissionType>;
  users: Array<{ id: string }>;
  posts: Array<{ id: string }>;
  context: Context;
}) => {
  permissions.map(
    async (permission) => await addPostPermission({ permission, users, posts, context }),
  );
};

export const deletePostPermission = async ({
  users,
  posts,
  context,
}: {
  users: Array<{ id: string }>;
  posts: Array<{ id: string }>;
  context: Context;
}) => {
  await Promise.all(
    posts.map(async (post) => {
      await Promise.all(
        users.map(async (user) => {
          const permissions = await context.photon.postPermissions.findMany({
            where: {
              object: post,
              users: {
                some: user,
              },
            },
            include: { users: true },
          });
          await Promise.all(
            permissions.map(async (permission) => {
              await context.photon.postPermissions.update({
                where: { id: permission.id },
                data: { users: { disconnect: user } },
              });
            }),
          );
        }),
      );
    }),
  );
};
