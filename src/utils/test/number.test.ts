import { normalizeIndex } from '../number';

describe('normalizeIndex', () => {
  it('should return the index passed in when it is not larger than the array length', () => {
    expect(normalizeIndex(2, 7)).toBe(2);
    expect(normalizeIndex(7, 7)).toBe(7);
  });
  it('should normalize the index when it is larger than the array length', () => {
    expect(normalizeIndex(13, 12)).toBe(1);
    expect(normalizeIndex(17, 12)).toBe(5);
    expect(normalizeIndex(20, 7)).toBe(6);
  });
});
