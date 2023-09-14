import { PianoPopoverWrapper } from "@/components/popover/PianoPopoverWrapper";
import { NoteName } from "@/features/note/constants";
import React from "react";

type NotePopoverProps = {
  name: NoteName;
  className?: string;
};

export const NotePopover: React.FC<NotePopoverProps> = ({
  name,
  className,
}) => {
  return (
    <PianoPopoverWrapper
      highlightedNotes={React.useMemo(() => [name], [name])}
      className={className}
    >
      <span>
        <span>{name.base}</span>
        {name.half && <span>{name.half === "sharp" ? "♯" : "♭"}</span>}
      </span>
    </PianoPopoverWrapper>
  );
};
