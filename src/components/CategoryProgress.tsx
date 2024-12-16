import clsx from 'clsx';

interface CategoryProgressProps {
  value: number;
  color: string;
}

export default function CategoryProgress({ value, color }: CategoryProgressProps) {
  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={clsx(
          "h-full transition-all duration-500",
          value === 1 ? color : 'bg-gray-300'
        )}
        style={{ width: `${value * 100}%` }}
      />
    </div>
  );
}