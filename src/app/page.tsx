"use client";

import { Select } from "@/components/Select";
import { ChordPopover } from "@/components/popover/ChordPopover";
import { NotePopover } from "@/components/popover/NotePopover";
import {
  DIATONIC_SEVENTHS_IN_KEY,
  DIATONIC_TRIADS_IN_KEY,
} from "@/features/chord";
import { KeyType, getNoteIndicesInKey } from "@/features/key";
import {
  convertNoteNameToString,
  getNoteName,
  getNoteNames,
} from "@/features/note";
import { GeneralNoteIndex, NOTE_INDICES } from "@/features/note/constants";
import React from "react";

const homeNoteOptions = NOTE_INDICES.map((index) => ({
  value: index,
  text: getNoteNames(index).map(convertNoteNameToString).join("/"),
}));
const keyTypeOptions = [
  {
    value: "major",
    text: "major",
  },
  {
    value: "minor",
    text: "minor",
  },
];

const KeyPage: React.FC = () => {
  const [selectedHomeNote, setSelectedHomeNote] =
    React.useState<GeneralNoteIndex>(1);
  const [selectedKeyType, setSelectedKeyType] =
    React.useState<KeyType>("major");

  const selectedKey = React.useMemo(
    () => ({ homeNote: selectedHomeNote, type: selectedKeyType }),
    [selectedHomeNote, selectedKeyType],
  );

  const noteNameListInKey = React.useMemo(() => {
    return getNoteIndicesInKey(selectedKey, true).map((noteIndex) =>
      getNoteName(noteIndex, selectedKey),
    );
  }, [selectedKey]);

  const diatonicTriads = React.useMemo(
    () =>
      noteNameListInKey.map((noteName, i) => ({
        baseNote: noteName,
        type: DIATONIC_TRIADS_IN_KEY[selectedKey.type][i],
      })),
    [noteNameListInKey, selectedKey.type],
  );

  const diatonicSevenths = React.useMemo(
    () =>
      noteNameListInKey.map((noteName, i) => ({
        baseNote: noteName,
        type: DIATONIC_SEVENTHS_IN_KEY[selectedKey.type][i],
      })),
    [noteNameListInKey, selectedKey.type],
  );

  const handleChangeHomeNote = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => setSelectedHomeNote(parseInt(e.target.value, 10)), []);

  const handleChangeKeyType = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => setSelectedKeyType(e.target.value as KeyType), []);

  return (
    <div className="flex flex-col items-center">
      <section className="flex flex-col items-center">
        <h2>Key</h2>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <Select
            label="Home note"
            selected={selectedHomeNote}
            options={homeNoteOptions}
            onChange={handleChangeHomeNote}
          />
          <Select
            label="Key type"
            selected={selectedKeyType}
            options={keyTypeOptions}
            onChange={handleChangeKeyType}
          />
        </div>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <h2>Notes</h2>
        <ul className="mt-2 flex flex-wrap gap-6 px-16">
          {noteNameListInKey.map((noteName, i) => {
            const noteNameString = convertNoteNameToString(noteName);
            return (
              <li key={noteNameString} className="flex-1 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {i + 1}
                </div>
                <NotePopover name={noteName} className="mt-2" />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <h2>Diatonic Triads</h2>
        <ul className="mt-2 flex flex-wrap gap-6 px-16">
          {diatonicTriads.map((triad, i) => {
            const chordNameString = `${convertNoteNameToString(
              triad.baseNote,
            )} ${triad.type}`;
            return (
              <li key={chordNameString} className="flex-1 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {i + 1}
                </div>
                <ChordPopover
                  baseNote={triad.baseNote}
                  chordType={triad.type}
                  className="mt-2"
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className="mt-8 flex flex-col items-center">
        <h2>Diatonic Sevenths</h2>
        <ul className="mt-2 flex flex-wrap gap-6 px-16">
          {diatonicSevenths.map((triad, i) => {
            const chordNameString = `${convertNoteNameToString(
              triad.baseNote,
            )} ${triad.type}`;
            return (
              <li key={chordNameString} className="flex-1 text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {i + 1}
                </div>
                <ChordPopover
                  baseNote={triad.baseNote}
                  chordType={triad.type}
                  className="mt-2"
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default KeyPage;
