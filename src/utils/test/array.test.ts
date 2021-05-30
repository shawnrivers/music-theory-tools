import { getItemByIndex } from '../array';

describe('getItemByIndex', () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  it('should get the correct item when the index is smaller than the array length and larger than 0', () => {
    expect(getItemByIndex(2, array)).toBe(3);
    expect(getItemByIndex(0, array)).toBe(1);
    expect(getItemByIndex(11, array)).toBe(12);
  });
  it('should get the correct item when the index is larger the array length', () => {
    expect(getItemByIndex(12, array)).toBe(1);
    expect(getItemByIndex(13, array)).toBe(2);
    expect(getItemByIndex(24, array)).toBe(1);
  });
  it('should get the correct item when the index is smaller than 0', () => {
    expect(getItemByIndex(-1, array)).toBe(12);
    expect(getItemByIndex(-2, array)).toBe(11);
    expect(getItemByIndex(-12, array)).toBe(1);
  });
});
