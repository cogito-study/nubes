import { PubSub } from 'apollo-server';
import { Photon } from '@prisma/photon';

export interface Context {
  pubsub: PubSub;
  photon: Photon;
  req: any;
}
