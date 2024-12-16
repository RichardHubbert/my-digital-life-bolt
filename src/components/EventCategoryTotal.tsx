import { Category } from '../types';

interface EventCategoryTotalProps {
  categories: Category[];
  pendingCount: number;
}

export default function EventCategoryTotal({ 
  categories,
  pendingCount
}: EventCategoryTotalProps) {
  const completedCategories = categories.filter(cat => cat.value === 1).length;
  const totalCategories = categories.length;
  const totalSelected = completedCategories + pendingCount;
  
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">
          Categories Completed
        </span>
        <div className="flex items-center space-x-1">
          <span className="text-lg font-bold text-green-600">
            {totalSelected}
          </span>
          <span className="text-sm text-gray-500">/ {totalCategories}</span>
        </div>
      </div>
    </div>
  );
}