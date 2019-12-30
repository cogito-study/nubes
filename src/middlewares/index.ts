import { sentry } from 'graphql-middleware-sentry';
import { Context } from '../types';
import { getUserID } from '../utils/authentication';
import { Environment } from '../utils/environment';
import { adminMiddlewares } from './admin';
import { authenticationMiddlewares } from './authentication';
import { departmentMiddlewares } from './department';
import { i18nMiddlewares } from './i18n';
import { instituteMiddlewares } from './institute';
import { noteMiddlewares } from './note';
import { noteCommentMiddlewares } from './note-comment';
import { noteCommentThreadMiddlewares } from './note-comment-thread';
import { noteHighlightMiddlewares } from './note-highlight';
import { subjectMiddlewares } from './subject';
import { subjectInformationMiddlewares } from './subject-information';
import { suggestionMiddlewares } from './suggestion';
import { userMiddlewares } from './user';

const sentryMiddleware =
  Environment.nodeEnv !== 'development' &&
  sentry<Context>({
    config: {
      dsn: Environment.sentryDSN || '',
      environment: Environment.nodeEnv,
    },
    forwardErrors: true,
    withScope: (scope, error, context) => {
      scope.setUser({ id: getUserID(context) });
      scope.setExtra('body', context.req.body);
      scope.setExtra('origin', context.req.headers.origin);
      scope.setExtra('user-agent', context.req.headers['user-agent']);
    },
  });

export const middlewares = [
  adminMiddlewares,
  authenticationMiddlewares,
  departmentMiddlewares,
  i18nMiddlewares,
  instituteMiddlewares,
  noteMiddlewares,
  noteCommentMiddlewares,
  noteCommentThreadMiddlewares,
  noteHighlightMiddlewares,
  subjectMiddlewares,
  subjectInformationMiddlewares,
  suggestionMiddlewares,
  userMiddlewares,
  sentryMiddleware,
];
