export const optionalConnect = (object?: { id: string }) => (object ? { connect: object } : null);
