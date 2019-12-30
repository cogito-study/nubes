import { Photon } from '@prisma/photon';
import { ApolloServer, PubSub } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { __ } from 'i18n';
import { middlewares } from './middlewares';
import { schema } from './schema';
import { validateJWToken } from './utils/authentication';
import { Environment } from './utils/environment';

const pubsub = new PubSub();
const photon = new Photon();

applyMiddleware(schema, ...middlewares);

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: async (connectionParams: { authToken?: string | null }) => {
      if (connectionParams.authToken) {
        const resolveToken = new Promise((resolve, reject) => {
          const token = validateJWToken(connectionParams.authToken);
          token ? resolve({ userID: token.userID }) : reject(new Error(__('invalid_token')));
        });

        return await resolveToken;
      }

      throw new Error(__('invalid_missing_token'));
    },
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        ...connection.context,
        pubsub,
        photon,
      };
    }

    return {
      req,
      photon,
      pubsub,
    };
  },
  playground: Environment.nodeEnv === 'development',
  debug: Environment.nodeEnv === 'development',
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server is running on ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
