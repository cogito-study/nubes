import { Photon } from '@prisma/photon';
import { ApolloServer, PubSub } from 'apollo-server';
import { schema } from './schema';
import { validateJWToken } from './utils/authentication';
import { Environment } from './utils/environment';

const pubsub = new PubSub();
const photon = new Photon({
  debug: true,
});

const server = new ApolloServer({
  schema,
  subscriptions: {
    onConnect: (connectionParams: { authToken?: string | null }) => {
      if (connectionParams.authToken) {
        return new Promise((resolve, reject) => {
          const token = validateJWToken(connectionParams.authToken);

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
  playground: Environment.nodeEnv === 'development',
  debug: Environment.nodeEnv === 'development',
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server is running on ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
