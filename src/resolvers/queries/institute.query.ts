import { extendType } from '@prisma/nexus';

export const InstituteQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneInstitute();
    t.crud.findManyInstitute();
  },
});
