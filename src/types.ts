import { PubSub } from 'apollo-server';
import { Photon } from '@generated/photon';

export interface Context {
  pubsub: PubSub;
  photon: Photon;
  req: any;
}
