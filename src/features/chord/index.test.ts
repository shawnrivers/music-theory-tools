import { getChordNoteIndices, getChordSymbol } from "@/features/chord";

describe("getChordNoteIndices", () => {
  type FuncParams = Parameters<typeof getChordNoteIndices>;
  type FuncReturn = ReturnType<typeof getChordNoteIndices>;
  type GetChordNoteIndicesTestTable = [
    FuncParams[0],
    FuncParams[1],
    FuncReturn,
  ][];

  const cTestTable: GetChordNoteIndicesTestTable = [
    [{ base: "C" }, "major triad", [1, 5, 8]],
    [{ base: "C" }, "minor triad", [1, 4, 8]],
    [{ base: "C" }, "augmented triad", [1, 5, 9]],
    [{ base: "C" }, "diminished triad", [1, 4, 7]],
    [{ base: "C" }, "major seventh", [1, 5, 8, 12]],
    [{ base: "C" }, "minor seventh", [1, 4, 8, 11]],
    [{ base: "C" }, "dominant seventh", [1, 5, 8, 11]],
    [{ base: "C" }, "diminished seventh", [1, 4, 7, 10]],
    [{ base: "C" }, "half-diminished seventh", [1, 4, 7, 11]],
    [{ base: "C" }, "suspended second", [1, 3, 8]],
    [{ base: "C" }, "suspended fourth", [1, 6, 8]],
    [{ base: "C" }, "added ninth", [1, 3, 5, 8]],
    [{ base: "C" }, "added eleventh", [1, 5, 6, 8]],
  ];

  test.each(cTestTable)(
    "All note indices of %o %o are %o",
    (baseNote, chordType, noteIndices) => {
      expect(getChordNoteIndices(baseNote, chordType)).toEqual(noteIndices);
    },
  );
});

describe("getChordSymbol", () => {
  type FuncParams = Parameters<typeof getChordSymbol>;
  type FuncReturn = ReturnType<typeof getChordSymbol>;
  type GetChordSymbolTestTable = [FuncParams[0], FuncParams[1], FuncReturn][];

  const cTestTable: GetChordSymbolTestTable = [
    [{ base: "C" }, "major triad", { base: "C" }],
    [{ base: "C" }, "minor triad", { base: "C", aside: "m" }],
    [{ base: "C" }, "augmented triad", { base: "C", aside: "aug" }],
    [{ base: "C" }, "diminished triad", { base: "C", aside: "dim" }],
    [
      { base: "C" },
      "major seventh",
      { base: "C", aside: "maj", supperScript: "7" },
    ],
    [
      { base: "C" },
      "minor seventh",
      { base: "C", aside: "m", supperScript: "7" },
    ],
    [{ base: "C" }, "dominant seventh", { base: "C", supperScript: "7" }],
    [
      { base: "C" },
      "diminished seventh",
      { base: "C", aside: "dim", supperScript: "7" },
    ],
    [
      { base: "C" },
      "half-diminished seventh",
      { base: "C", aside: "m7", supperScript: "o5" },
    ],
    [
      { base: "C" },
      "suspended second",
      { base: "C", aside: "sus", supperScript: "2" },
    ],
    [
      { base: "C" },
      "suspended fourth",
      { base: "C", aside: "sus", supperScript: "4" },
    ],
    [
      { base: "C" },
      "added ninth",
      { base: "C", aside: "add", supperScript: "9" },
    ],
    [
      { base: "C" },
      "added eleventh",
      { base: "C", aside: "add", supperScript: "11" },
    ],
  ];

  test.each(cTestTable)(
    "The symbol of %o %o is %o",
    (baseNote, chordType, chordSymbol) => {
      expect(getChordSymbol(baseNote, chordType)).toEqual(chordSymbol);
    },
  );
});
