import { getChordNoteIndices, getChordSymbol } from '../chord';

describe('getChordNoteIndices', () => {
  type FuncParams = Parameters<typeof getChordNoteIndices>;
  type FuncReturn = ReturnType<typeof getChordNoteIndices>;
  type GetChordNoteIndicesTestTable = [
    FuncParams[0],
    FuncParams[1],
    FuncReturn,
  ][];

  const cTestTable: GetChordNoteIndicesTestTable = [
    [1, 'majorTriad', [1, 5, 8]],
    [1, 'minorTriad', [1, 4, 8]],
    [1, 'augmentedTriad', [1, 5, 9]],
    [1, 'diminishedTriad', [1, 4, 7]],
    [1, 'majorSeventh', [1, 5, 8, 12]],
    [1, 'minorSeventh', [1, 4, 8, 11]],
    [1, 'dominantSeventh', [1, 5, 8, 11]],
    [1, 'diminishedSeventh', [1, 4, 7, 10]],
  ];

  test.each(cTestTable)(
    'All note indices of %o %o are %o',
    (baseNote, chordType, noteIndices) => {
      expect(getChordNoteIndices(baseNote, chordType)).toEqual(noteIndices);
    },
  );
});

describe('getChordSymbol', () => {
  type FuncParams = Parameters<typeof getChordSymbol>;
  type FuncReturn = ReturnType<typeof getChordSymbol>;
  type GetChordSymbolTestTable = [FuncParams[0], FuncParams[1], FuncReturn][];

  const cTestTable: GetChordSymbolTestTable = [
    [1, 'majorTriad', { base: 'C' }],
    [1, 'minorTriad', { base: 'C', aside: 'm' }],
    [1, 'augmentedTriad', { base: 'C', aside: 'aug' }],
    [1, 'diminishedTriad', { base: 'C', aside: 'dim' }],
    [1, 'majorSeventh', { base: 'C', supperScript: 'maj7' }],
    [1, 'minorSeventh', { base: 'C', aside: 'min', supperScript: '7' }],
    [1, 'dominantSeventh', { base: 'C', supperScript: '7' }],
    [1, 'diminishedSeventh', { base: 'C', aside: 'dim', supperScript: '7' }],
  ];

  test.each(cTestTable)(
    'The symbol of %o %o is %o',
    (baseNote, chordType, chordSymbol) => {
      expect(getChordSymbol(baseNote, chordType)).toEqual(chordSymbol);
    },
  );
});
