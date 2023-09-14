import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { cn } from "@/utils/classNames";
import { PianoProps, Piano } from "@/components/Piano";

type PianoPopoverWrapperProps = {
  children: React.ReactNode;
  className?: string;
} & Pick<PianoProps, "highlightedNotes">;

export const PianoPopoverWrapper: React.FC<PianoPopoverWrapperProps> = ({
  children,
  className,
  highlightedNotes,
}) => {
  return (
    <div className={cn("w-full", className)}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={cn(
                open
                  ? "bg-gray-500 text-white hover:bg-gray-500 hover:text-white dark:bg-gray-800 dark:hover:bg-gray-800"
                  : "bg-gray-200 hover:bg-gray-300 hover:text-current dark:bg-gray-600 dark:hover:bg-gray-700",
                "group rounded-md px-4 py-2 shadow-sm active:bg-gray-500 active:text-white dark:active:bg-gray-800",
              )}
            >
              {children}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 -translate-x-1/2">
                <div className="overflow-hidden rounded-lg bg-gray-50 p-3 shadow-lg ring-1 ring-gray-900/50 dark:bg-gray-700 dark:ring-gray-500/50">
                  <Piano
                    className="h-32 w-48 max-w-full"
                    highlightedNotes={highlightedNotes}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
