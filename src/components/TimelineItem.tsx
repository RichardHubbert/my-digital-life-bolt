import { TimelineEvent } from '../types';
import { formatTime, getEventProgress } from '../utils/timelineHelpers';
import TimelineStatus from './TimelineStatus';
import clsx from 'clsx';

interface TimelineItemProps {
  event: TimelineEvent;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function TimelineItem({ 
  event, 
  onClick, 
  isFirst, 
  isLast 
}: TimelineItemProps) {
  const progress = getEventProgress(event);
  
  return (
    <button
      onClick={onClick}
      className={clsx(
        "group relative flex items-start",
        "min-w-[120px] w-full",
        "hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
      )}
    >
      {/* Time and Status Column */}
      <div className="flex flex-col items-center z-10 w-[120px] shrink-0">
        <div className="mb-2 w-24 text-center">
          <span className={clsx(
            "text-sm font-medium",
            progress === 100 ? "text-green-600" : "text-gray-600"
          )}>
            {formatTime(event.time)}
          </span>
        </div>
        <TimelineStatus progress={progress} />
      </div>

      {/* Content Column */}
      <div className="ml-4 flex-grow text-left">
        <span className={clsx(
          "text-sm font-medium block",
          progress === 100 
            ? "text-green-700" 
            : progress > 0 
              ? "text-yellow-700" 
              : "text-gray-900",
          "group-hover:opacity-75"
        )}>
          {event.title}
        </span>
        <p className="text-xs text-gray-500 mt-1">
          {event.description}
        </p>
      </div>
    </button>
  );
}