"use client";

import { Select } from "@/components/Select";
import { ChordPopover } from "@/components/popover/ChordPopover";
import { CHORDS, getChordNoteIndices } from "@/features/chord";
import {
  getNoteName,
  convertNoteNameToString,
  getNoteNames,
} from "@/features/note";
import { GeneralNoteIndex, NOTE_INDICES } from "@/features/note/constants";
import React from "react";

const baseNoteOptions = NOTE_INDICES.map((index) => ({
  value: index,
  text: getNoteNames(index).map(convertNoteNameToString).join("/"),
}));

const ChordPage: React.FC = () => {
  const [selectedBaseNote, setSelectedBaseNote] =
    React.useState<GeneralNoteIndex>(1);

  const chords = React.useMemo(
    () =>
      CHORDS.map((chordType) => {
        const baseNoteName = getNoteName(selectedBaseNote);
        const chordNoteIndices = getChordNoteIndices(
          selectedBaseNote,
          chordType,
        );

        return {
          name: `${convertNoteNameToString(baseNoteName)} ${chordType}`,
          type: chordType,
          notes: chordNoteIndices.map((noteIndex) => getNoteName(noteIndex)),
        };
      }),
    [selectedBaseNote],
  );

  const handleChangeBaseNote = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => setSelectedBaseNote(parseInt(e.target.value, 10)), []);

  return (
    <div className="flex flex-col items-center">
      <section>
        <h2>Base Note</h2>
        <div className="mt-2">
          <Select
            label="Base note"
            selected={selectedBaseNote}
            options={baseNoteOptions}
            onChange={handleChangeBaseNote}
          />
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <h2>Chords</h2>
        <div className="mt-2 grid grid-flow-row grid-cols-3 items-center gap-4">
          <span className="font-bold">Name</span>
          <span className="font-bold">Symbol</span>
          <span className="font-bold">Notes</span>
          {chords.map((chord) => (
            <React.Fragment key={chord.name}>
              <span className="capitalize">{chord.name}</span>
              <ChordPopover
                baseNote={selectedBaseNote}
                chordType={chord.type}
              />
              <span className="grid grid-flow-col gap-2">
                {chord.notes.map((note) => {
                  const noteName = convertNoteNameToString(note);
                  return <span key={noteName}>{noteName}</span>;
                })}
              </span>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChordPage;
