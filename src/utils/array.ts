/**
 * Get the item based on its index safely.
 * @param index the index that can be any integer
 * @param array the base array
 * @returns the item based on the index
 */
export function getItemByIndex<T>(index: number, array: readonly T[]): T {
  const length = array.length;
  let normalizedIndex = index;
  if (index > 0) {
    normalizedIndex = index % length;
  } else {
    normalizedIndex = (index % length) + length;
  }
  if (normalizedIndex === length) {
    normalizedIndex = 0;
  }

  return array[normalizedIndex];
}
