import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import { Photon } from '@generated/photon';
import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { applyMiddleware } from 'graphql-middleware';
import { makeSchema } from 'nexus';
import { join, resolve } from 'path';
import { middlewares } from './middlewares';
import * as allTypes from './resolvers';
import { Context } from './types';
config({ path: resolve(__dirname, '../.env') });

const photon = new Photon({
  debug: true,
});

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

const schema = makeSchema({
  types: [allTypes, nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
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
  context: (request) => {
    return {
      ...request,
      photon,
    };
  },
  playground: process.env.NODE_ENV === 'development',
  debug: process.env.NODE_ENV === 'development',
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server is running on ${url}`);
});
