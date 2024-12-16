import { TimelineEvent } from '../types';
import { Dialog } from '@headlessui/react';

interface EventModalHeaderProps {
  event: TimelineEvent;
}

export default function EventModalHeader({ event }: EventModalHeaderProps) {
  return (
    <div className="mt-3 text-center sm:mt-5">
      <Dialog.Title
        as="h3"
        className="text-xl sm:text-2xl font-semibold leading-6 text-gray-900"
      >
        {event.time} - {event.title}
      </Dialog.Title>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{event.description}</p>
      </div>
    </div>
  );
}