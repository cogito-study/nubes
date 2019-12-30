import { config } from 'dotenv';
import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import { join, resolve } from 'path';
import * as allTypes from './resolvers';

config({ path: resolve(__dirname, '../.env') });

export const schema = makeSchema({
  types: [allTypes],
  // @ts-ignore
  plugins: [nexusPrismaPlugin()],
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
