import type { NextPage } from 'next';
import { Select } from 'app/components/Select';
import { NotePopover } from 'app/components/popover/NotePopover';
import { GeneralNoteIndex, NOTE_INDICES } from 'app/constants/note';
import {
  convertNoteNameToString,
  getNoteName,
  getNoteNames,
} from 'app/utils/note';
import { useCallback, useMemo, useState } from 'react';
import { getNoteIndicesInKey, KeyType } from 'app/utils/key';
import {
  DIATONIC_SEVENTHS_IN_KEY,
  DIATONIC_TRIADS_IN_KEY,
} from 'app/utils/chord';
import { ChordPopover } from 'app/components/popover/ChordPopover';

const homeNoteOptions = NOTE_INDICES.map(index => ({
  value: index,
  text: getNoteNames(index).map(convertNoteNameToString).join('/'),
}));
const keyTypeOptions = [
  {
    value: 'major',
    text: 'major',
  },
  {
    value: 'minor',
    text: 'minor',
  },
];

const KeyPage: NextPage = () => {
  const [selectedHomeNote, setSelectedHomeNote] = useState<GeneralNoteIndex>(1);
  const handleChangeHomeNote = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(e => setSelectedHomeNote(parseInt(e.target.value, 10)), []);

  const [selectedKeyType, setSelectedKeyType] = useState<KeyType>('major');
  const handleChangeKeyType = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(e => setSelectedKeyType(e.target.value as KeyType), []);

  const selectedKey = useMemo(
    () => ({ homeNote: selectedHomeNote, type: selectedKeyType }),
    [selectedHomeNote, selectedKeyType],
  );

  const noteNameListInKey = useMemo(() => {
    return getNoteIndicesInKey(selectedKey, true).map(noteIndex =>
      getNoteName(noteIndex, selectedKey),
    );
  }, [selectedKey]);

  const diatonicTriads = useMemo(
    () =>
      noteNameListInKey.map((noteName, i) => ({
        baseNote: noteName,
        type: DIATONIC_TRIADS_IN_KEY[selectedKey.type][i],
      })),
    [noteNameListInKey, selectedKey.type],
  );

  const diatonicSevenths = useMemo(
    () =>
      noteNameListInKey.map((noteName, i) => ({
        baseNote: noteName,
        type: DIATONIC_SEVENTHS_IN_KEY[selectedKey.type][i],
      })),
    [noteNameListInKey, selectedKey.type],
  );

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
        <ul className="mt-2 px-16 flex flex-wrap gap-6">
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
        <ul className="mt-2 px-16 flex flex-wrap gap-6">
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
        <ul className="mt-2 px-16 flex flex-wrap gap-6">
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
