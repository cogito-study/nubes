import { extendType } from 'nexus';

export const PostCommentQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.postComment();
  },
});
