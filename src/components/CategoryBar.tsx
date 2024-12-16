import { Category } from '../types';
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import CategoryIcon from './CategoryIcon';
import clsx from 'clsx';

interface CategoryBarProps {
  category: Category;
  onToggle: (categoryId: number) => void;
  isDisabled: boolean;
  isPending: boolean;
  isSelected: boolean;
}

export default function CategoryBar({ 
  category, 
  onToggle, 
  isDisabled,
  isPending,
  isSelected
}: CategoryBarProps) {
  const handleClick = () => {
    if (!isDisabled && !category.value) {
      onToggle(category.id);
    }
  };

  const isCompleted = category.value === 1;

  return (
    <div className={clsx(
      "w-full p-4 rounded-lg transition-all duration-200 flex items-center justify-between",
      isSelected || isCompleted ? "bg-green-50" : "bg-white",
      !isDisabled && !isCompleted ? "hover:bg-gray-50" : "",
      "border border-gray-200"
    )}>
      <button 
        onClick={handleClick}
        disabled={isDisabled || isCompleted}
        className={clsx(
          "flex items-center space-x-3",
          !isDisabled && !isCompleted ? "cursor-pointer" : "cursor-not-allowed"
        )}
      >
        <CategoryIcon 
          category={category} 
          isSelected={isSelected || isCompleted}
        />
        <span className={clsx(
          "font-medium",
          isSelected || isCompleted ? "text-green-700" : "text-gray-700"
        )}>
          {category.name}
        </span>
      </button>

      <div className="flex items-center space-x-3">
        {isCompleted && (
          <div className="flex items-center space-x-1">
            <CheckIcon className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">Completed</span>
          </div>
        )}
        
        {isPending && !isCompleted && (
          <button
            onClick={() => onToggle(category.id)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Reset category"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
}