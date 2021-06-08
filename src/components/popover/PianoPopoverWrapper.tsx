import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Piano, PianoProps } from 'app/components/Piano';
import classNames from 'classnames';

type PianoPopoverWrapperProps = {
  children: React.ReactNode;
  className?: string;
} & Pick<PianoProps, 'highlightedNotes'>;

export const PianoPopoverWrapper: React.VFC<PianoPopoverWrapperProps> =
  props => {
    const { children, className, highlightedNotes } = props;

    return (
      <div className={classNames('w-full', className)}>
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`${
                  !open
                    ? 'bg-gray-200 dark:bg-gray-600'
                    : 'bg-gray-500 text-white dark:bg-gray-800'
                } hover:bg-gray-300 hover:text-current dark:hover:bg-gray-700 group px-4 py-2 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500`}
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
                <Popover.Panel className="absolute z-10 mt-3 transform -translate-x-1/2 left-1/2">
                  <div className="p-3 overflow-hidden rounded-lg shadow-lg ring-1 ring-gray-900 ring-opacity-5 bg-gray-50 dark:ring-gray-500 dark:bg-gray-700">
                    <Piano
                      className="w-48 max-w-full h-32"
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
