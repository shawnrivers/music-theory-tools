import {
  getNoteIndicesInKey,
  getNoteIndexInKey,
  getNoteNamesInKey,
} from "@/features/key";

describe("getNoteIndicesInKey", () => {
  it("should return the note indices in the key", () => {
    expect(
      getNoteIndicesInKey({ homeNote: { base: "G" }, type: "minor" }),
    ).toEqual([8, 10, 11, 13, 15, 16, 18]);
  });
  it("should return the normalized note indices in the key", () => {
    expect(
      getNoteIndicesInKey({ homeNote: { base: "G" }, type: "minor" }, true),
    ).toEqual([8, 10, 11, 1, 3, 4, 6]);
  });
});

describe("getNoteIndexInKey", () => {
  it("should return the index of the passed note in the key", () => {
    expect(getNoteIndexInKey(5, { homeNote: 1, type: "major" })).toBe(3);
  });
  it("should return the normalized index of the passed note in the key when the normalize param is passed", () => {
    expect(
      getNoteIndexInKey(
        { base: "F", half: "sharp" },
        { homeNote: { base: "G" }, type: "major" },
        true,
      ),
    ).toBe(7);
  });
  it("should return null when the note is not in the key", () => {
    expect(
      getNoteIndexInKey(
        { base: "C" },
        { homeNote: { base: "F", half: "sharp" }, type: "minor" },
      ),
    ).toBe(null);
  });
});

describe("getNoteIndexInKey", () => {
  it("should return the note base names of the given key", () => {
    expect(
      getNoteNamesInKey({ homeNote: [{ base: "C" }], type: "major" }),
    ).toEqual([
      { base: "C" },
      { base: "D" },
      { base: "E" },
      { base: "F" },
      { base: "G" },
      { base: "A" },
      { base: "B" },
    ]);
    expect(
      getNoteNamesInKey({ homeNote: [{ base: "G" }], type: "minor" }),
    ).toEqual([
      { base: "G" },
      { base: "A" },
      { base: "B", half: "flat" },
      { base: "C" },
      { base: "D" },
      { base: "E", half: "flat" },
      { base: "F" },
    ]);
    expect(
      getNoteNamesInKey({
        homeNote: [
          { base: "A", half: "sharp" },
          { base: "B", half: "flat" },
        ],
        type: "major",
      }),
    ).toEqual([
      { base: "B", half: "flat" },
      { base: "C" },
      { base: "D" },
      { base: "E", half: "flat" },
      { base: "F" },
      { base: "G" },
      { base: "A" },
    ]);
    expect(
      getNoteNamesInKey({
        homeNote: { base: "A", half: "sharp" },
        type: "major",
      }),
    ).toEqual([
      { base: "B", half: "flat" },
      { base: "C" },
      { base: "D" },
      { base: "E", half: "flat" },
      { base: "F" },
      { base: "G" },
      { base: "A" },
    ]);
  });
});
