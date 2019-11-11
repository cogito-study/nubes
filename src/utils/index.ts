export const optionalConnect = (object?: { id: string }) => (object ? { connect: object } : null);

export const catchNotExistError = (err: { message: string }) =>
  err.message.match(/Record Does Not Exist/i) ? null : err;
