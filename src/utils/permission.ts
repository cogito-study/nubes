type IdentifiableObject = { id: string };

export const mapObjectsToIdentifiables = <T extends IdentifiableObject>(
  objects: T[],
): IdentifiableObject[] => objects.map(({ id }) => ({ id }));
