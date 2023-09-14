import { Key, getNoteNamesInKey } from "@/features/key";
import {
  Note,
  GeneralNoteIndex,
  NoteName,
  NoteNames,
  NormalizedNoteIndex,
  NOTE_COUNT,
  NOTE_INDICES,
  NOTE_NAMES_LIST,
} from "@/features/note/constants";
import { normalizeIndex } from "@/utils/number";

function isNoteIndex(note: Note): note is GeneralNoteIndex {
  return typeof note === "number";
}

// function isNormalizedNoteIndex(note: Note): note is NormalizedNoteIndex {
//   return (
//     typeof note === 'number' &&
//     NOTE_INDICES.includes(note as NormalizedNoteIndex)
//   );
// }

function isNoteName(note: Note): note is NoteName {
  return typeof note === "object" && !Array.isArray(note);
}

function isNoteNames(note: Note): note is NoteNames {
  return Array.isArray(note);
}

/**
 * Determine whether two note names are the same.
 * @param noteNameA note name A
 * @param noteNameB note name B
 * @returns whether the two note names are the same
 */
function equalNoteName(noteNameA: NoteName, noteNameB: NoteName): boolean {
  return noteNameA.base === noteNameB.base && noteNameA.half === noteNameB.half;
}

/**
 * Get normalized note index.
 * @param noteIndex note index that can be larger 12
 * @returns the normalized note index in the arrange from 1 to 12
 * @example
 * normalizeNoteIndex(7); // returns 7
 * normalizeNoteIndex(13); // returns 1
 */
export function normalizeNoteIndex(noteIndex: number): NormalizedNoteIndex {
  return normalizeIndex(noteIndex, NOTE_COUNT) as NormalizedNoteIndex;
}

/**
 * Get the index of a note.
 * @param note any form of a note
 * @param [normalize=false] normalize the index or not
 * @returns the index of the note
 */
export function getNoteIndex<T extends boolean>(
  note: Note,
  normalize?: T,
): T extends true ? NormalizedNoteIndex : GeneralNoteIndex;
export function getNoteIndex(
  note: Note,
  normalize?: boolean,
): NormalizedNoteIndex | GeneralNoteIndex {
  if (isNoteIndex(note)) {
    if (note < 1) {
      throw new Error("Pass an index that is larger than 0");
    }
    if (normalize) {
      return normalizeNoteIndex(note);
    }
    return note;
  }

  const noteIndex = NOTE_INDICES.find((_index) =>
    NOTE_NAMES_LIST[_index].some((_noteName) =>
      isNoteNames(note)
        ? note.some((noteName) => equalNoteName(noteName, _noteName))
        : equalNoteName(note, _noteName),
    ),
  );

  if (noteIndex === undefined) {
    throw new Error("Pass the correct note name or note names");
  }

  return normalize ? normalizeNoteIndex(noteIndex) : noteIndex;
}

/**
 * Gets possible names of a note.
 * @param note any form of a note
 * @returns all the possible names of the note
 */
export function getNoteNames(note: Note): NoteNames {
  if (isNoteNames(note)) {
    return note;
  }

  return NOTE_NAMES_LIST[getNoteIndex(note, true)];
}

/**
 * Gets the most proper name of a note depending on which key it is in.
 * @param note any form of a note
 * @param key the key the note is in (the home note of the key must be given a single name)
 * @returns the proper name of the note
 */
export function getNoteName<T extends Note>(
  note: Note,
  key?: Key<T>,
): NoteName {
  if (isNoteName(note)) {
    return note;
  }

  if (key === undefined) {
    return getNoteNames(note)[0];
  }

  const noteNamesInKey = getNoteNamesInKey(key);
  const noteName = noteNamesInKey.find(
    (noteName) => getNoteIndex(noteName) === getNoteIndex(note),
  );
  return noteName ?? getNoteNames(note)[0];
}

/**
 * Convert a note name (`NoteName`) to string.
 * @param noteName note name
 * @returns the form of the note name
 * @example
 * convertNoteNameToString({ base: 'C', half: 'sharp' }); // returns 'C♯'
 */
export function convertNoteNameToString(noteName: NoteName): string {
  const base = noteName.base;
  const half = noteName.half ? (noteName.half === "sharp" ? "♯" : "♭") : "";
  return `${base}${half}`;
}

/**
 * Determine whether two notes are the same.
 * @param noteA note A
 * @param noteB note B
 * @returns whether the two notes are the same
 */
export function equalNote(noteA: Note, noteB: Note): boolean {
  return getNoteIndex(noteA) === getNoteIndex(noteB);
}
