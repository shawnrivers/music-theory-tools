import { GeneralNoteIndex, Note } from 'app/constants/note';
import { convertNoteNameToString, getNoteIndex, getNoteName } from './note';

type TriadChordType =
  | 'majorTriad'
  | 'minorTriad'
  | 'augmentedTriad'
  | 'diminishedTriad';

type SeventhChordType =
  | 'majorSeventh'
  | 'minorSeventh'
  | 'dominantSeventh'
  | 'diminishedSeventh';

type ChordType = TriadChordType | SeventhChordType;

const chordIntervals: Record<ChordType, number[]> = {
  majorTriad: [4, 3],
  minorTriad: [3, 4],
  augmentedTriad: [4, 4],
  diminishedTriad: [3, 3],
  majorSeventh: [4, 3, 4],
  minorSeventh: [3, 4, 3],
  dominantSeventh: [4, 3, 3],
  diminishedSeventh: [3, 3, 3],
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

type ChordSymbol = {
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
    case 'majorTriad':
      return { base: baseNoteNameString };
    case 'minorTriad':
      return { base: baseNoteNameString, aside: 'm' };
    case 'augmentedTriad':
      return { base: baseNoteNameString, aside: 'aug' };
    case 'diminishedTriad':
      return { base: baseNoteNameString, aside: 'dim' };
    case 'majorSeventh':
      return { base: baseNoteNameString, supperScript: 'maj7' };
    case 'minorSeventh':
      return { base: baseNoteNameString, aside: 'min', supperScript: '7' };
    case 'dominantSeventh':
      return { base: baseNoteNameString, supperScript: '7' };
    case 'diminishedSeventh':
      return { base: baseNoteNameString, aside: 'dim', supperScript: '7' };
  }
}
