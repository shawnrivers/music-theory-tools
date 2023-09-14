/**
 * All the base alphabets of notes.
 */
export const NOTE_BASE_NAMES = ["C", "D", "E", "F", "G", "A", "B"] as const;

/**
 * The base alphabet of a note.
 */
export type NoteBaseName = (typeof NOTE_BASE_NAMES)[number];

/**
 * The naming of each note.
 */
export type NoteName = Readonly<{
  base: NoteBaseName;
  half?: "sharp" | "flat";
}>;

/**
 * A note can be represented in different names.
 * E.g., C♯ and D♭.
 */
export type NoteNames = Readonly<[NoteName] | [NoteName, NoteName]>;

/**
 * All 12 notes in their indices.
 */
export const NOTE_INDICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

/**
 * All 7 natural notes in their indices.
 */
export const NATURAL_NOTE_INDICES = [1, 3, 5, 6, 8, 10, 12] as const;

/**
 * All 5 accidental notes in their indices.
 */
export const ACCIDENTAL_NOTE_INDICES = [2, 4, 7, 9, 11] as const;

/**
 * The normalized index of each note.
 */
export type NormalizedNoteIndex = (typeof NOTE_INDICES)[number];

/**
 * The general index of each note.
 */
export type GeneralNoteIndex = number;

/**
 * The number of all notes.
 */
export const NOTE_COUNT = NOTE_INDICES.length;

/**
 * All possible expression of a note with normalized note index.
 */
export type NormalizedNote = NormalizedNoteIndex | NoteName | NoteNames;

/**
 * All possible expression of a note.
 */
export type Note =
  | Exclude<NormalizedNote, NormalizedNoteIndex>
  | GeneralNoteIndex;

/**
 * All 12 notes' names.
 */
export const NOTE_NAMES_LIST: Readonly<Record<NormalizedNoteIndex, NoteNames>> =
  {
    1: [{ base: "C" }],
    2: [
      { base: "C", half: "sharp" },
      { base: "D", half: "flat" },
    ],
    3: [{ base: "D" }],
    4: [
      { base: "D", half: "sharp" },
      { base: "E", half: "flat" },
    ],
    5: [{ base: "E" }],
    6: [{ base: "F" }],
    7: [
      { base: "F", half: "sharp" },
      { base: "G", half: "flat" },
    ],
    8: [{ base: "G" }],
    9: [
      { base: "G", half: "sharp" },
      { base: "A", half: "flat" },
    ],
    10: [{ base: "A" }],
    11: [
      { base: "A", half: "sharp" },
      { base: "B", half: "flat" },
    ],
    12: [{ base: "B" }],
  };
