import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { PROGRESS_THRESHOLDS } from '../utils/constants';

interface TimelineStatusProps {
  progress: number;
}

export default function TimelineStatus({ progress }: TimelineStatusProps) {
  const isComplete = progress === 100;
  const isInProgress = progress > 0 && progress < 100;

  return (
    <div className="relative">
      <div
        className={clsx(
          "w-4 h-4 rounded-full transition-all duration-300",
          "flex items-center justify-center",
          isComplete 
            ? "bg-green-100" 
            : isInProgress 
              ? "bg-yellow-100" 
              : "bg-gray-100"
        )}
      >
        {isComplete ? (
          <CheckCircleIcon className="w-4 h-4 text-green-600" />
        ) : isInProgress ? (
          <ClockIcon className="w-3 h-3 text-yellow-600" />
        ) : null}
      </div>
      
      {progress > 0 && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className={clsx(
            "text-xs font-medium",
            progress === 100 
              ? "text-green-600" 
              : progress >= PROGRESS_THRESHOLDS.HIGH 
                ? "text-yellow-600" 
                : "text-gray-500"
          )}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}