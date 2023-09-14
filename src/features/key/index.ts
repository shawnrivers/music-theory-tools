import {
  NormalizedNoteIndexInKey,
  NOTE_COUNT_IN_KEY,
  KEY_NOTE_INTERVALS,
  GeneralNoteIndexInKey,
} from "@/features/key/constants";
import { getNoteIndex, getNoteNames } from "@/features/note";
import {
  Note,
  NormalizedNoteIndex,
  GeneralNoteIndex,
  NoteName,
  NoteNames,
  NOTE_BASE_NAMES,
} from "@/features/note/constants";
import { getItemByIndex } from "@/utils/array";
import { normalizeIndex } from "@/utils/number";

export type ItemsInKey<T> = [T, T, T, T, T, T, T];
// type GeneralNoteIndicesInKey = ItemsInKey<GeneralNoteIndexInKey>;
type NormalizedNoteIndicesInKey = ItemsInKey<NormalizedNoteIndexInKey>;

export type KeyType = "major" | "minor";
export type Key<T extends Note> = Readonly<{
  homeNote: T;
  type: KeyType;
}>;

/**
 * Get normalized note index in a key.
 * @param noteIndexInKey note index that can be larger 7
 * @returns the normalized note index in the arrange from 1 to 7
 * @example
 * normalizeNoteIndexInKey(8); // returns 1
 * normalizeNoteIndexInKey(7); // returns 7
 */
export function normalizeNoteIndexInKey(
  noteIndexInKey: number,
): NormalizedNoteIndexInKey {
  return normalizeIndex(
    noteIndexInKey,
    NOTE_COUNT_IN_KEY,
  ) as NormalizedNoteIndexInKey;
}

/**
 * Get all the note indices of a key.
 * @param key the key
 * @param [normalize=false] normalize the index or not
 * @returns all the note indices of the key
 */
export function getNoteIndicesInKey<T extends Note, U extends boolean>(
  key: Key<T>,
  normalize?: U,
): U extends true
  ? ItemsInKey<NormalizedNoteIndex>
  : ItemsInKey<GeneralNoteIndex>;
export function getNoteIndicesInKey<T extends Note, U extends boolean>(
  key: Key<T>,
  normalize?: U,
): ItemsInKey<NormalizedNoteIndex> | ItemsInKey<GeneralNoteIndex> {
  const { homeNote, type } = key;
  const homeNoteIndex = getNoteIndex(homeNote, true) as GeneralNoteIndex;
  const noteIndices = [homeNoteIndex];

  for (let i = 0; i < KEY_NOTE_INTERVALS[type].length - 1; i++) {
    const prevNoteIndex = noteIndices[i];
    const interval = KEY_NOTE_INTERVALS[type][i];
    // console.log({ i, noteIndices, prevNoteIndex, interval });
    noteIndices.push(getNoteIndex(prevNoteIndex + interval, normalize));
  }

  return noteIndices as NormalizedNoteIndicesInKey;
}

/**
 * Get the index of a note in a key.
 * @param note any form of a note
 * @param key the key the note is in
 * @param [normalize=false] normalize the index or not
 */
export function getNoteIndexInKey<T extends Note, U extends boolean>(
  note: T,
  key: Key<T>,
  normalize?: U,
): U extends true
  ? NormalizedNoteIndexInKey | null
  : GeneralNoteIndexInKey | null;
export function getNoteIndexInKey<T extends Note, U extends boolean>(
  note: T,
  key: Key<T>,
  normalize?: U,
): NormalizedNoteIndexInKey | GeneralNoteIndexInKey | null {
  const noteIndex = getNoteIndex(note, true);
  const keyNoteIndices = getNoteIndicesInKey(key, true);
  const noteIndexInKey = keyNoteIndices.indexOf(noteIndex) + 1;

  if (noteIndexInKey === 0) {
    return null;
  }

  return normalize ? normalizeNoteIndexInKey(noteIndexInKey) : noteIndexInKey;
}

/**
 * Get the notes' names in a key.
 * @param key the key
 * @returns the notes' names in a key
 */
export function getNoteNamesInKey<T extends Note>(
  key: Key<T>,
): ItemsInKey<NoteName> {
  const noteIndices = getNoteIndicesInKey(key, true);
  const noteNames = noteIndices.map(getNoteNames) as ItemsInKey<NoteNames>;
  const noteNamesInKey = new Array<NoteName | null>(NOTE_COUNT_IN_KEY).fill(
    null,
  );

  const loopTimesLimit = 7;
  let loopCount = 0;
  // Loop until the result is filled or looping for too many times
  while (noteNamesInKey.includes(null) && loopCount <= loopTimesLimit) {
    for (let i = 0; i < NOTE_COUNT_IN_KEY; i++) {
      const noteNamesItem = noteNames[i];
      const noteNamesInKeyItem = noteNamesInKey[i];

      // Only check when the result is still null
      if (noteNamesInKeyItem === null) {
        if (noteNamesItem.length === 1) {
          // Use the first note name when there is only one possible name
          noteNamesInKey[i] = noteNamesItem[0];
        } else {
          // Pick the correct note name based on its neighboring item
          const prevNoteNamesInKeyItem = getItemByIndex(i - 1, noteNamesInKey);
          const nextNoteNamesInKeyItem = getItemByIndex(i + 1, noteNamesInKey);

          if (prevNoteNamesInKeyItem !== null) {
            const prevNoteBaseNameInKey = prevNoteNamesInKeyItem.base;
            const prevNoteBaseNameIndexInKey = NOTE_BASE_NAMES.indexOf(
              prevNoteBaseNameInKey,
            );
            const expectedBaseName = getItemByIndex(
              prevNoteBaseNameIndexInKey + 1,
              NOTE_BASE_NAMES,
            );
            const expectedNoteName =
              noteNamesItem.find(
                (noteName) => noteName.base === expectedBaseName,
              ) ?? null;
            noteNamesInKey[i] = expectedNoteName;
          } else if (nextNoteNamesInKeyItem !== null) {
            const nextNoteBaseNameInKey = nextNoteNamesInKeyItem.base;
            const nextNoteBaseNameIndexInKey = NOTE_BASE_NAMES.indexOf(
              nextNoteBaseNameInKey,
            );
            const expectedBaseName = getItemByIndex(
              nextNoteBaseNameIndexInKey - 1,
              NOTE_BASE_NAMES,
            );
            const expectedNoteName =
              noteNamesItem.find(
                (noteName) => noteName.base === expectedBaseName,
              ) ?? null;
            noteNamesInKey[i] = expectedNoteName;
          }
        }
      }
    }
    loopCount++;
  }

  return noteNamesInKey as ItemsInKey<NoteName>;
}
