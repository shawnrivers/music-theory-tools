import type { NextPage } from 'next';
import { Select } from 'app/components/Select';
import { useCallback, useMemo, useState, Fragment } from 'react';
import { GeneralNoteIndex, NOTE_INDICES } from 'app/constants/note';
import {
  convertNoteNameToString,
  getNoteName,
  getNoteNames,
} from 'app/utils/note';
import { CHORDS, getChordNoteIndices } from 'app/utils/chord';
import { ChordPopover } from 'app/components/popover/ChordPopover';

const baseNoteOptions = NOTE_INDICES.map(index => ({
  value: index,
  text: getNoteNames(index).map(convertNoteNameToString).join('/'),
}));

const ChordPage: NextPage = () => {
  const [selectedBaseNote, setSelectedBaseNote] = useState<GeneralNoteIndex>(1);
  const handleChangeBaseNote = useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >(e => setSelectedBaseNote(parseInt(e.target.value, 10)), []);

  const chords = useMemo(
    () =>
      CHORDS.map(chordType => {
        const baseNoteName = getNoteName(selectedBaseNote);
        const chordNoteIndices = getChordNoteIndices(
          selectedBaseNote,
          chordType,
        );

        return {
          name: `${convertNoteNameToString(baseNoteName)} ${chordType}`,
          type: chordType,
          notes: chordNoteIndices.map(noteIndex => getNoteName(noteIndex)),
        };
      }),
    [selectedBaseNote],
  );

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
        <div className="mt-2 grid grid-cols-3 items-center grid-flow-row gap-4">
          <span className="font-bold">Name</span>
          <span className="font-bold">Symbol</span>
          <span className="font-bold">Notes</span>
          {chords.map(chord => (
            <Fragment key={chord.name}>
              <span className="capitalize">{chord.name}</span>
              <ChordPopover
                baseNote={selectedBaseNote}
                chordType={chord.type}
              />
              <span className="grid grid-flow-col gap-2">
                {chord.notes.map(note => {
                  const noteName = convertNoteNameToString(note);
                  return <span key={noteName}>{noteName}</span>;
                })}
              </span>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChordPage;
