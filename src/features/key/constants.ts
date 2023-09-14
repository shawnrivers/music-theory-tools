/**
 * Note intervals (in half-note) for major and minor keys.
 */
export const KEY_NOTE_INTERVALS = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
} as const;

/**
 * All 7 notes in their indices in a key.
 */
export const NOTE_INDICES_IN_KEY = [1, 2, 3, 4, 5, 6, 7] as const;

/**
 * The normalized index of each note in a key.
 */
export type NormalizedNoteIndexInKey = (typeof NOTE_INDICES_IN_KEY)[number];

/**
 * The general index of each note in a key.
 */
export type GeneralNoteIndexInKey = number;

/**
 * The number of all notes in a key.
 */
export const NOTE_COUNT_IN_KEY = NOTE_INDICES_IN_KEY.length;
