import { extendType } from 'nexus';

export const NoteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.note();
    t.crud.notes({
      filtering: {
        title: true,
        number: true,
        description: true,
        subject: true,
        likers: true,
      },
    });
  },
});
