import { Suggestion } from '@generated/photon';

export const isActiveSuggestion = ({ rejectedAt, approvedAt, deletedAt }: Suggestion) =>
  rejectedAt === null && approvedAt === null && deletedAt === null;
