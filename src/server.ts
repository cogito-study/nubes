import { Photon } from '@prisma/photon';
import { ApolloServer, PubSub } from 'apollo-server';
import { schema } from './schema';
import { validateJWToken } from './utils/authentication';

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
