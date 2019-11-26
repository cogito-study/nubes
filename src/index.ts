import { Photon } from '@prisma/photon';
import { ApolloServer, PubSub } from 'apollo-server';
import { config } from 'dotenv';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { join, resolve } from 'path';
import { middlewares } from './middlewares';
import * as allTypes from './resolvers';
import { Context } from './types';
import { validateJWToken } from './utils/authentication';

config({ path: resolve(__dirname, '../.env') });

const pubsub = new PubSub();
const photon = new Photon({
  debug: true,
});

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const schema = makeSchema({
  types: [allTypes],
  plugins: [nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
});

// @ts-ignore
applyMiddleware(schema, ...middlewares);

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: (connectionParams: { authToken?: string | null }) => {
      if (connectionParams.authToken) {
        return new Promise((resolve, reject) => {
          const token = validateJWToken(connectionParams.authToken);

          console.log('token', token);

          // TODO: Localize
          token ? resolve(token.userID) : reject(new Error('Invalid auth token!'));
        });
      }
      // TODO: Localize
      throw new Error('Missing auth token!');
    },
  },
  context: (request) => {
    return {
      ...request,
      photon,
      pubsub,
    };
  },
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server is running on ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
