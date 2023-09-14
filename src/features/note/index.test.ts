import { normalizeNoteIndex, getNoteIndex, getNoteName } from "@/features/note";

describe("normalizeNoteIndex", () => {
  it("should return the note index passed in when it is not larger than the count of all notes", () => {
    expect(normalizeNoteIndex(1)).toBe(1);
    expect(normalizeNoteIndex(12)).toBe(12);
  });
  it("should normalize the note index when it is larger than the count of all notes", () => {
    expect(normalizeNoteIndex(13)).toBe(1);
    expect(normalizeNoteIndex(17)).toBe(5);
    expect(normalizeNoteIndex(20)).toBe(8);
  });
});

describe("getNoteIndex", () => {
  it("should return the passed note index", () => {
    expect(getNoteIndex(5)).toBe(5);
  });
  it("should return the correct note index when the param is a note name", () => {
    expect(getNoteIndex({ base: "D", half: "sharp" })).toBe(4);
  });
  it("should return the correct note index when the param is a note names", () => {
    expect(
      getNoteIndex([
        { base: "F", half: "sharp" },
        { base: "G", half: "flat" },
      ]),
    ).toBe(7);
    expect(getNoteIndex([{ base: "A" }])).toBe(10);
  });
});

describe("getNoteName", () => {
  type FuncParams = Parameters<typeof getNoteName>;
  type FuncReturn = ReturnType<typeof getNoteName>;

  it("should return the passed note name", () => {
    expect(getNoteName({ base: "A", half: "flat" })).toEqual({
      base: "A",
      half: "flat",
    });
  });
  it("should return the first one in the note names when no key is given", () => {
    expect(
      getNoteName([
        { base: "A", half: "sharp" },
        { base: "B", half: "flat" },
      ]),
    ).toEqual({ base: "A", half: "sharp" });
  });

  type GetNoteNameTestTable = [FuncParams[0], FuncParams[1], FuncReturn][];

  // in D♯ major key
  const dSharpMajorTable: GetNoteNameTestTable = [
    [
      [
        { base: "D", half: "sharp" },
        { base: "E", half: "flat" },
      ],
      { homeNote: { base: "D", half: "sharp" }, type: "major" },
      { base: "E", half: "flat" },
    ],
    [
      [{ base: "G" }],
      { homeNote: { base: "D", half: "sharp" }, type: "major" },
      { base: "G" },
    ],
    [
      [
        { base: "G", half: "sharp" },
        { base: "A", half: "flat" },
      ],
      { homeNote: { base: "D", half: "sharp" }, type: "major" },
      { base: "A", half: "flat" },
    ],
    [
      [
        { base: "A", half: "sharp" },
        { base: "B", half: "flat" },
      ],
      { homeNote: { base: "D", half: "sharp" }, type: "major" },
      { base: "B", half: "flat" },
    ],
  ];

  // in G minor key
  const gMinorTable: GetNoteNameTestTable = [
    [
      [{ base: "G" }],
      { homeNote: { base: "G" }, type: "minor" },
      { base: "G" },
    ],
    [
      [{ base: "A" }],
      { homeNote: { base: "G" }, type: "minor" },
      { base: "A" },
    ],
    [
      [
        { base: "A", half: "sharp" },
        { base: "B", half: "flat" },
      ],
      { homeNote: { base: "G" }, type: "minor" },
      { base: "B", half: "flat" },
    ],
    [
      [
        { base: "D", half: "sharp" },
        { base: "E", half: "flat" },
      ],
      { homeNote: { base: "G" }, type: "minor" },
      { base: "E", half: "flat" },
    ],
  ];

  test.each(dSharpMajorTable)(
    "The note name of %o in D♯ major key should be %o",
    (noteNames, key, expectedNoteName) => {
      expect(getNoteName(noteNames, key)).toEqual(expectedNoteName);
    },
  );
  test.each(gMinorTable)(
    "The note name of %o in G minor key should be %o",
    (noteNames, key, expectedNoteName) => {
      expect(getNoteName(noteNames, key)).toEqual(expectedNoteName);
    },
  );
});
