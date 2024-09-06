export const chunkArray = <T>(array: T[] | undefined, size: number) => {
  if (!array) {
    return undefined;
  }
  const result = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
};
