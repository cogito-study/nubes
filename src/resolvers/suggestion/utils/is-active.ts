import { Suggestion } from '@prisma/photon';

export const isActiveSuggestion = ({ rejectedAt, approvedAt, deletedAt }: Suggestion) =>
  rejectedAt === null && approvedAt === null && deletedAt === null;
