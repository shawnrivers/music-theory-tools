import { ChordSymbol } from "@/components/ChordSymbol";
import { PianoPopoverWrapper } from "@/components/popover/PianoPopoverWrapper";
import {
  ChordType,
  getChordNoteIndices,
  getChordSymbol,
} from "@/features/chord";
import { Note } from "@/features/note/constants";
import React from "react";

type ChordPopoverProps = {
  baseNote: Note;
  chordType: ChordType;
  className?: string;
};

export const ChordPopover: React.FC<ChordPopoverProps> = ({
  baseNote,
  chordType,
  className,
}) => {
  const notes = React.useMemo(
    () => getChordNoteIndices(baseNote, chordType),
    [baseNote, chordType],
  );
  const symbol = getChordSymbol(baseNote, chordType);

  return (
    <PianoPopoverWrapper highlightedNotes={notes} className={className}>
      <ChordSymbol symbol={symbol} />
    </PianoPopoverWrapper>
  );
};
