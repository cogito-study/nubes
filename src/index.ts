import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import Photon from '@generated/photon';
import { makeSchema } from '@prisma/nexus';
import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { applyMiddleware } from 'graphql-middleware';
import { join, resolve } from 'path';
import * as allTypes from './resolvers';
import { noteInputValidator } from './resolvers/note/note.input';
import { userLoginInputValidator } from './resolvers/user/user.input';
import { Context } from './types';

config({ path: resolve(__dirname, '../.env') });

const photon = new Photon({
  debug: true,
});

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
});

// Minimal example middleware (before & after)
const exampleMiddleware = {
  Mutation: {
    login: userLoginInputValidator,
  },
  Query: {
    note: noteInputValidator,
  },
};

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
applyMiddleware(schema, exampleMiddleware);

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

server.listen().then(({ url, server }) => {
  console.log(`🚀 Server is running on ${url}`);
});
