import { useMemo } from 'react';
import { TimelineEvent } from '../types';
import CategoryBar from './CategoryBar';
import EventModalHeader from './EventModalHeader';
import EventCategoryTotal from './EventCategoryTotal';
import SubmitButton from './SubmitButton';
import Modal from './common/Modal';
import { useCategorySelection } from '../hooks/useCategorySelection';
import { getAvailableCategories } from '../utils/categoryHelpers';

interface EventModalProps {
  event: TimelineEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleCategory: (eventId: number, categoryIds: number[]) => void;
  canScoreCategory: (eventId: number, categoryId: number) => boolean;
}

export default function EventModal({ 
  event, 
  isOpen, 
  onClose, 
  onToggleCategory,
  canScoreCategory 
}: EventModalProps) {
  const {
    pendingCategories,
    liveScore,
    toggleCategory,
    selectAllCategories,
    resetSelection
  } = useCategorySelection(event?.categories ?? []);

  const availableCategories = useMemo(() => {
    if (!event) return [];
    return getAvailableCategories(event.categories, (categoryId) => 
      canScoreCategory(event.id, categoryId)
    );
  }, [event, canScoreCategory]);

  const handleSubmit = async () => {
    if (!event) return;
    const categoryIds = Array.from(pendingCategories);
    await onToggleCategory(event.id, categoryIds);
    resetSelection();
    onClose();
  };

  const handleSelectAll = () => {
    const availableCategoryIds = availableCategories
      .filter(category => category.value === 0)
      .map(category => category.id);
    selectAllCategories(availableCategoryIds);
  };

  if (!event) return null;

  // Split categories into two columns for desktop only
  const firstColumnCategories = event.categories.slice(0, 5);
  const secondColumnCategories = event.categories.slice(5);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EventModalHeader event={event} />

      <div className="mt-6">
        {/* First row: Categories text and Score */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-700">
            Select categories to complete:
          </p>
          <span className="text-sm font-semibold text-green-600">
            Score: {liveScore}
          </span>
        </div>

        {/* Second row: Submit and Select All buttons */}
        <div className="flex justify-between items-center mb-6">
          <SubmitButton 
            onClick={handleSubmit}
            disabled={pendingCategories.size === 0}
          />
          {availableCategories.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Select All
            </button>
          )}
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* First Column */}
          <div className="space-y-2">
            {firstColumnCategories.map((category) => (
              <CategoryBar 
                key={category.id} 
                category={category}
                isDisabled={!canScoreCategory(event.id, category.id)}
                onToggle={toggleCategory}
                isPending={pendingCategories.has(category.id)}
                isSelected={pendingCategories.has(category.id) || category.value === 1}
              />
            ))}
          </div>

          {/* Second Column */}
          <div className="space-y-2">
            {secondColumnCategories.map((category) => (
              <CategoryBar 
                key={category.id} 
                category={category}
                isDisabled={!canScoreCategory(event.id, category.id)}
                onToggle={toggleCategory}
                isPending={pendingCategories.has(category.id)}
                isSelected={pendingCategories.has(category.id) || category.value === 1}
              />
            ))}
          </div>
        </div>
      </div>

      <EventCategoryTotal 
        categories={event.categories} 
        pendingCount={pendingCategories.size}
      />
    </Modal>
  );
}