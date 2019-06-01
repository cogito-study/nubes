import { GraphQLServer } from 'graphql-yoga';
import { info } from 'heroku-logger';
import { prisma } from './generated/prisma-client';
import { permissions } from './middlewares/permissions';
import { resolvers } from './resolvers';

/* eslint-disable @typescript-eslint/no-explicit-any */
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
const options = {
  bodyParserOptions: { limit: '10mb', type: 'application/json' },
};

server.start(options, () => info('Server started!'));
