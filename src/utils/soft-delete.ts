export type SoftDeletableObject = { deletedAt: Date | null };
export const deleteSoftDeletedObjectFromResponse = <T extends SoftDeletableObject>(
  object: T,
): T => {
  return object.deletedAt ? null : object;
};
