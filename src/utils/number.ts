/**
 * Get the normalized index based on the length of an array
 * @param generalIndex index that can be larger than `arrayLength`
 * @param arrayLength length of the array the normalization is based on
 * @returns the normalized index
 * @example
 * normalizeIndex(2, 7); // return 2
 * normalizeIndex(13, 12); // return 1
 */
export function normalizeIndex(
  generalIndex: number,
  arrayLength: number,
): number {
  if (generalIndex === arrayLength) {
    return arrayLength;
  }

  return generalIndex % arrayLength;
}
