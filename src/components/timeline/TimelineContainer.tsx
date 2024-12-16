import { ReactNode } from 'react';
import clsx from 'clsx';

interface TimelineContainerProps {
  children: ReactNode;
}

export default function TimelineContainer({ children }: TimelineContainerProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="relative">
        <div className="absolute hidden md:block h-1 w-full bg-gray-200 top-1/2 transform -translate-y-1/2" />
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-center space-y-8 md:space-y-0">
          {children}
        </div>
      </div>
    </div>
  );
}