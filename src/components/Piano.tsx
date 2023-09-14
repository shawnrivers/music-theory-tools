import { equalNote } from "@/features/note";
import {
  Note,
  NATURAL_NOTE_INDICES,
  ACCIDENTAL_NOTE_INDICES,
} from "@/features/note/constants";
import { cn } from "@/utils/classNames";

type KeyProps = { isHighlighted?: boolean; className?: string };

const NaturalKey: React.FC<KeyProps> = ({ isHighlighted = false }) => {
  return (
    <div
      className={cn(
        isHighlighted
          ? "bg-rose-300 dark:bg-rose-400"
          : "bg-white dark:bg-gray-200",
        "rounded-b border border-gray-300 dark:border-gray-400",
      )}
    />
  );
};

const AccidentalKey: React.FC<KeyProps> = ({
  isHighlighted = false,
  className,
}) => {
  return (
    <div
      className={cn(
        isHighlighted
          ? "bg-rose-400 dark:bg-indigo-400"
          : "bg-gray-600 dark:bg-gray-700",
        "col-start-2 col-end-3 rounded-b",
        className,
      )}
    ></div>
  );
};

export type PianoProps = {
  className?: string;
  highlightedNotes: Note[];
};

export const Piano: React.FC<PianoProps> = (props) => {
  const { className, highlightedNotes } = props;

  return (
    <div className={cn("relative block", className)}>
      <div className="grid h-full grid-cols-naturals">
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[0]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[1]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[2]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[3]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[4]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[5]),
          )}
        />
        <NaturalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, NATURAL_NOTE_INDICES[6]),
          )}
        />
      </div>
      <div className="absolute top-0 grid h-3/5 w-full grid-cols-accidentals">
        <AccidentalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[0]),
          )}
          className="col-start-2 col-end-3"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[1]),
          )}
          className="col-start-4 col-end-5"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[2]),
          )}
          className="col-start-7 col-end-8"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[3]),
          )}
          className="col-start-9 col-end-10"
        />
        <AccidentalKey
          isHighlighted={highlightedNotes.some((note) =>
            equalNote(note, ACCIDENTAL_NOTE_INDICES[4]),
          )}
          className="col-start-11 col-end-12"
        />
      </div>
    </div>
  );
};
