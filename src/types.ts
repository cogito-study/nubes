import { Photon } from '@prisma/photon';
import { PubSub } from 'apollo-server';
import { Request } from 'express';

export interface Context {
  pubsub: PubSub;
  photon: Photon;
  req?: Request;
  userID?: string;
}
