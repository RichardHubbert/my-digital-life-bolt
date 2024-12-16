import { useState, useEffect } from 'react';
import { Category } from '../types';

export function useCategorySelection(categories: Category[]) {
  const [pendingCategories, setPendingCategories] = useState<Set<number>>(new Set());
  const [liveScore, setLiveScore] = useState(0);

  useEffect(() => {
    // Calculate total score including both completed and pending categories
    const completedCount = categories.filter(cat => cat.value === 1).length;
    const pendingCount = pendingCategories.size;
    setLiveScore(completedCount + pendingCount);
  }, [categories, pendingCategories]);

  const toggleCategory = (categoryId: number) => {
    setPendingCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const selectAllCategories = (categoryIds: number[]) => {
    // Create a new Set with all available category IDs
    const availableCategories = new Set(categoryIds);
    setPendingCategories(availableCategories);
  };

  const resetSelection = () => {
    setPendingCategories(new Set());
  };

  return {
    pendingCategories,
    liveScore,
    toggleCategory,
    selectAllCategories,
    resetSelection
  };
}