import { nexusPrismaPlugin } from '@generated/nexus-prisma';
import Photon from '@generated/photon';
import { makeSchema } from '@prisma/nexus';
import { ApolloServer } from 'apollo-server';
import { join } from 'path';
import * as allTypes from './resolvers';
import { Context } from './types';

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
