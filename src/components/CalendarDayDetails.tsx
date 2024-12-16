import { Dialog } from '@headlessui/react';
import { TimelineEvent } from '../types';
import { format } from 'date-fns';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { calculateTotalCompletedCategories } from '../utils/scoring';

interface CalendarDayDetailsProps {
  date: Date;
  events: TimelineEvent[];
}

export default function CalendarDayDetails({ date, events }: CalendarDayDetailsProps) {
  const totalCompletedCategories = calculateTotalCompletedCategories(events);
  const eventsWithCompletedCategories = events.filter(event => 
    event.categories.some(cat => cat.value === 1)
  );

  return (
    <div className="mt-4">
      <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900 mb-4">
        Activities for {format(date, 'MMMM d, yyyy')}
      </Dialog.Title>

      <div className="space-y-4">
        {eventsWithCompletedCategories.map((event) => {
          const completedCategories = event.categories.filter(cat => cat.value === 1);

          return (
            <div key={event.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{event.time} - {event.title}</h4>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {completedCategories.length} completed
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {completedCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-700">Total Categories Completed</span>
          <span className="font-semibold text-green-600">{totalCompletedCategories}</span>
        </div>
      </div>
    </div>
  );
}