import { extendType } from '@prisma/nexus';

export const LanguageQuery = extendType({
  type: 'Query',
  definition: (t) => {
    t.crud.findOneLanguage({ alias: 'language' });
    t.crud.findManyLanguage({ alias: 'languages' });
  },
});
