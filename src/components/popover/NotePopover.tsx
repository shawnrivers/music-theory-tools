import { NoteName } from 'app/constants/note';
import { PianoPopoverWrapper } from 'app/components/popover/PianoPopoverWrapper';

type NotePopoverProps = {
  name: NoteName;
  className?: string;
};

export const NotePopover: React.VFC<NotePopoverProps> = props => {
  const { name, className } = props;

  return (
    <PianoPopoverWrapper highlightedNotes={[name]} className={className}>
      <span>
        <span>{name.base}</span>
        {name.half && <span>{name.half === 'sharp' ? '♯' : '♭'}</span>}
      </span>
    </PianoPopoverWrapper>
  );
};
