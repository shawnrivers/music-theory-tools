import { GeneralNoteIndex, Note } from 'app/constants/note';
import { convertNoteNameToString, getNoteIndex, getNoteName } from './note';

const TRIAD_CHORDS = [
  'major triad',
  'minor triad',
  'augmented triad',
  'diminished triad',
] as const;
const SEVENTH_CHORDS = [
  'major seventh',
  'minor seventh',
  'dominant seventh',
  'diminished seventh',
] as const;
export const CHORDS = [...TRIAD_CHORDS, ...SEVENTH_CHORDS] as const;

export type ChordType = typeof CHORDS[number];

const chordIntervals: Record<ChordType, number[]> = {
  'major triad': [4, 3],
  'minor triad': [3, 4],
  'augmented triad': [4, 4],
  'diminished triad': [3, 3],
  'major seventh': [4, 3, 4],
  'minor seventh': [3, 4, 3],
  'dominant seventh': [4, 3, 3],
  'diminished seventh': [3, 3, 3],
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
    case 'major triad':
      return { base: baseNoteNameString };
    case 'minor triad':
      return { base: baseNoteNameString, aside: 'm' };
    case 'augmented triad':
      return { base: baseNoteNameString, aside: 'aug' };
    case 'diminished triad':
      return { base: baseNoteNameString, aside: 'dim' };
    case 'major seventh':
      return { base: baseNoteNameString, supperScript: 'maj7' };
    case 'minor seventh':
      return { base: baseNoteNameString, aside: 'min', supperScript: '7' };
    case 'dominant seventh':
      return { base: baseNoteNameString, supperScript: '7' };
    case 'diminished seventh':
      return { base: baseNoteNameString, aside: 'dim', supperScript: '7' };
  }
}
