import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  CheckCircleIcon 
} from '@heroicons/react/24/outline';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';
import { useCalendar } from '../hooks/useCalendar';
import { useTimelineData } from '../hooks/useTimelineData';
import CalendarDayDetails from './CalendarDayDetails';
import LoadingSpinner from './LoadingSpinner';
import clsx from 'clsx';

interface CalendarViewProps {
  isOpen: boolean;
  onClose: () => void;
  usageDates: Date[];
}

export default function CalendarView({ isOpen, onClose, usageDates }: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { events, loading, error } = useTimelineData();
  const { 
    currentDate, 
    goToPreviousMonth, 
    goToNextMonth, 
    goToToday 
  } = useCalendar();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateUsed = (date: Date) => {
    return usageDates.some(usageDate => isSameDay(usageDate, date));
  };

  const handleDayClick = (date: Date) => {
    if (isDateUsed(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={onClose}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-center sm:justify-between mb-8">
                <div className="text-center sm:text-left">
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    {format(currentDate, 'MMMM yyyy')}
                  </Dialog.Title>
                </div>
                <div className="mt-3 sm:ml-4 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      onClick={goToToday}
                      className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Today
                    </button>
                    <button
                      onClick={goToNextMonth}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map(day => {
                  const isUsed = isDateUsed(day);
                  const isCurrentMonth = isSameMonth(day, currentDate);
                  const isDayToday = isToday(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);

                  return (
                    <button
                      key={day.toString()}
                      onClick={() => handleDayClick(day)}
                      disabled={!isUsed}
                      className={clsx(
                        "aspect-square p-2 flex items-center justify-center relative",
                        isCurrentMonth ? "bg-white" : "bg-gray-50",
                        isUsed && "bg-green-50 hover:bg-green-100 cursor-pointer",
                        isDayToday && "ring-2 ring-blue-500",
                        isSelected && "ring-2 ring-green-500",
                        "rounded-lg transition-all duration-200"
                      )}
                    >
                      <span className={clsx(
                        "text-sm font-medium",
                        !isCurrentMonth && "text-gray-400",
                        isUsed && "text-green-700",
                        isDayToday && "text-blue-700"
                      )}>
                        {format(day, 'd')}
                      </span>
                      {isUsed && (
                        <CheckCircleIcon 
                          className="absolute bottom-1 right-1 h-4 w-4 text-green-500" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedDate && (
                loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <div className="mt-4 text-red-600 text-center">{error}</div>
                ) : (
                  <CalendarDayDetails 
                    date={selectedDate}
                    events={events}
                  />
                )
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600">App used on this day</span>
                  </div>
                  <span className="text-gray-600">
                    Total days: {usageDates.length}
                  </span>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}