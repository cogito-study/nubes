import { GraphQLServer } from 'graphql-yoga';
import * as logger from 'heroku-logger';

import { prisma } from './generated/prisma-client';
import { resolvers } from './resolvers';
import { permissions } from './middlewares/permissions';

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => logger.info('Server started!'));
