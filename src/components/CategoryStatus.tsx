import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

interface CategoryStatusProps {
  isCompleted: boolean;
  color: string;
}

export default function CategoryStatus({ isCompleted, color }: CategoryStatusProps) {
  if (!isCompleted) return null;
  
  return (
    <CheckCircleIcon 
      className={clsx(
        'h-5 w-5 transition-all duration-300',
        color.replace('bg-', 'text-')
      )} 
    />
  );
}