import {
  Note,
  NATURAL_NOTE_INDICES,
  ACCIDENTAL_NOTE_INDICES,
} from 'app/constants/note';
import { equalNote } from 'app/utils/note';
import classNames from 'classnames';

type KeyProps = { isHighlighted?: boolean; className?: string };

const NaturalKey: React.VFC<KeyProps> = props => {
  const { isHighlighted = false } = props;
  return (
    <div
      className={`${
        isHighlighted ? 'bg-rose-300' : 'bg-white'
      } border border-gray-300 rounded-b`}
    />
  );
};

const AccidentalKey: React.VFC<KeyProps> = props => {
  const { isHighlighted = false, className } = props;
  return (
    <div
      className={classNames(
        `${
          isHighlighted ? 'bg-rose-400' : 'bg-gray-600'
        } rounded-b col-start-2 col-end-3`,
        className,
      )}
    ></div>
  );
};

export type PianoProps = {
  className?: string;
  highlightedNotes: Note[];
};

export const Piano: React.VFC<PianoProps> = props => {
  const { className, highlightedNotes } = props;

  return (
    <div className={classNames('block relative', className)}>
      <div className="h-full grid grid-cols-naturals">
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[0]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[1]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[2]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[3]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[4]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[5]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, NATURAL_NOTE_INDICES[6]),
          )}
        />
      </div>
      <div className="absolute top-0 w-full h-3/5 grid grid-cols-accidentals">
        <AccidentalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[0]),
          )}
          className="col-start-2 col-end-3"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[1]),
          )}
          className="col-start-4 col-end-5"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[2]),
          )}
          className="col-start-7 col-end-8"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[3]),
          )}
          className="col-start-9 col-end-10"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some(note =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[4]),
          )}
          className="col-start-11 col-end-12"
        />
      </div>
    </div>
  );
};
