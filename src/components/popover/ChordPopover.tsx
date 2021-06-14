import { PianoPopoverWrapper } from 'app/components/popover/PianoPopoverWrapper';
import { ChordSymbol } from 'app/components/ChordSymbol';
import {
  ChordType,
  getChordNoteIndices,
  getChordSymbol,
} from 'app/utils/chord';
import { Note } from 'app/constants/note';
import { useMemo } from 'react';

type ChordPopoverProps = {
  baseNote: Note;
  chordType: ChordType;
  className?: string;
};

export const ChordPopover: React.VFC<ChordPopoverProps> = props => {
  const { baseNote, chordType, className } = props;
  const notes = useMemo(
    () => getChordNoteIndices(baseNote, chordType),
    [baseNote, chordType],
  );
  const symbol = useMemo(
    () => getChordSymbol(baseNote, chordType),
    [baseNote, chordType],
  );

  return (
    <PianoPopoverWrapper highlightedNotes={notes} className={className}>
      <ChordSymbol symbol={symbol} />
    </PianoPopoverWrapper>
  );
};
