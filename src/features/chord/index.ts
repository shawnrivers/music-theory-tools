import { ItemsInKey, KeyType } from "@/features/key";
import {
  getNoteIndex,
  convertNoteNameToString,
  getNoteName,
} from "@/features/note";
import { Note, GeneralNoteIndex } from "@/features/note/constants";

const TRIAD_CHORDS = [
  "major triad",
  "minor triad",
  "augmented triad",
  "diminished triad",
] as const;
const SEVENTH_CHORDS = [
  "major seventh",
  "minor seventh",
  "dominant seventh",
  "diminished seventh",
  "half-diminished seventh",
] as const;
const SUSPENDED_CHORDS = ["suspended second", "suspended fourth"] as const;
const ADDED_CHORDS = ["added ninth", "added eleventh"] as const;
export const CHORDS = [
  ...TRIAD_CHORDS,
  ...SEVENTH_CHORDS,
  ...SUSPENDED_CHORDS,
  ...ADDED_CHORDS,
] as const;

type TriadChordType = (typeof TRIAD_CHORDS)[number];
type SeventhChordType = (typeof SEVENTH_CHORDS)[number];
export type ChordType = (typeof CHORDS)[number];

const chordIntervals: Record<ChordType, number[]> = {
  "major triad": [4, 3],
  "minor triad": [3, 4],
  "augmented triad": [4, 4],
  "diminished triad": [3, 3],
  "major seventh": [4, 3, 4],
  "minor seventh": [3, 4, 3],
  "dominant seventh": [4, 3, 3],
  "diminished seventh": [3, 3, 3],
  "half-diminished seventh": [3, 3, 4],
  "suspended second": [2, 5],
  "suspended fourth": [5, 2],
  "added ninth": [2, 2, 3],
  "added eleventh": [4, 1, 2],
};

export const DIATONIC_TRIADS_IN_KEY: Record<
  KeyType,
  ItemsInKey<TriadChordType>
> = {
  major: [
    "major triad",
    "minor triad",
    "minor triad",
    "major triad",
    "major triad",
    "minor triad",
    "diminished triad",
  ],
  minor: [
    "minor triad",
    "diminished triad",
    "major triad",
    "minor triad",
    "minor triad",
    "major triad",
    "major triad",
  ],
};

export const DIATONIC_SEVENTHS_IN_KEY: Record<
  KeyType,
  ItemsInKey<SeventhChordType>
> = {
  major: [
    "major seventh",
    "minor seventh",
    "minor seventh",
    "major seventh",
    "dominant seventh",
    "minor seventh",
    "half-diminished seventh",
  ],
  minor: [
    "minor seventh",
    "half-diminished seventh",
    "major seventh",
    "minor seventh",
    "minor seventh",
    "major seventh",
    "dominant seventh",
  ],
};

/**
 * Get the chord's all notes' indices.
 * @param baseNote the chord's base note
 * @param type the chord's type
 * @returns the chord's all notes' indices
 */
export function getChordNoteIndices(
  baseNote: Note,
  type: ChordType,
): GeneralNoteIndex[] {
  const intervals = chordIntervals[type];
  const chordNoteIndices = [getNoteIndex(baseNote, true)];
  for (let i = 0; i < intervals.length; i++) {
    chordNoteIndices.push(
      getNoteIndex(chordNoteIndices[i] + intervals[i], true),
    );
  }
  return chordNoteIndices;
}

export type ChordSymbol = {
  base: string;
  aside?: string;
  supperScript?: string;
};

/**
 * Get the chord's symbol.
 * @param baseNote the chord's base note
 * @param type the chord's type
 * @returns the chord's symbol
 */
export function getChordSymbol(baseNote: Note, type: ChordType): ChordSymbol {
  const baseNoteNameString = convertNoteNameToString(getNoteName(baseNote));
  switch (type) {
    case "major triad":
      return { base: baseNoteNameString };
    case "minor triad":
      return { base: baseNoteNameString, aside: "m" };
    case "augmented triad":
      return { base: baseNoteNameString, aside: "aug" };
    case "diminished triad":
      return { base: baseNoteNameString, aside: "dim" };
    case "major seventh":
      return { base: baseNoteNameString, aside: "maj", supperScript: "7" };
    case "minor seventh":
      return { base: baseNoteNameString, aside: "m", supperScript: "7" };
    case "dominant seventh":
      return { base: baseNoteNameString, supperScript: "7" };
    case "diminished seventh":
      return { base: baseNoteNameString, aside: "dim", supperScript: "7" };
    case "diminished seventh":
      return { base: baseNoteNameString, aside: "dim", supperScript: "7" };
    case "half-diminished seventh":
      return { base: baseNoteNameString, aside: "m7", supperScript: "o5" };
    case "suspended second":
      return { base: baseNoteNameString, aside: "sus", supperScript: "2" };
    case "suspended fourth":
      return { base: baseNoteNameString, aside: "sus", supperScript: "4" };
    case "added ninth":
      return { base: baseNoteNameString, aside: "add", supperScript: "9" };
    case "added eleventh":
      return { base: baseNoteNameString, aside: "add", supperScript: "11" };
  }
}
