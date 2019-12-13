import { GraphQLResolveInfo } from 'graphql';
import { configure, setLocale } from 'i18n';
import { FieldResolver } from 'nexus';
import { join } from 'path';
import { Context } from '../../types';

const defaultLocale = 'en';

const setLanguage = async (context: Context, availableLanguages: Array<string>) => {
  const languageCode = context.req.headers.languagecode;
  availableLanguages.includes(languageCode) ? setLocale(languageCode) : setLocale(defaultLocale);
};

export const i18nInitMiddleware = async (
  resolve: FieldResolver<any, any>,
  parent: {},
  args: {},
  context: Context,
  info: GraphQLResolveInfo,
) => {
  if (context.req == undefined) return await resolve(parent, args, context, info);

  const languages = await context.photon.languages.findMany();
  const availableLanguages = languages.map((language) => language.code);
  configure({
    locales: availableLanguages,
    defaultLocale: defaultLocale,
    queryParameter: 'lang',
    directory: join('./', 'src/i18n'),
    api: {
      __: 'translate',
      __n: 'translateN',
    },
  });

  setLanguage(context, availableLanguages);
  return await resolve(parent, args, context, info);
};
