import { PROGRESS_THRESHOLDS } from '../utils/constants';
import clsx from 'clsx';

interface TimelineProgressProps {
  progress: number;
}

export default function TimelineProgress({ progress }: TimelineProgressProps) {
  return (
    <div
      className={clsx(
        "w-4 h-4 rounded-full bg-white border-4 transition-all duration-300",
        progress >= PROGRESS_THRESHOLDS.HIGH 
          ? "border-green-500 group-hover:border-green-600" 
          : progress >= PROGRESS_THRESHOLDS.MEDIUM 
            ? "border-blue-500 group-hover:border-blue-600" 
            : "border-gray-500 group-hover:border-gray-600",
        "group-hover:scale-125"
      )}
    />
  );
}