import { Category } from '../types';

export const isCategoryCompleted = (category: Category): boolean => {
  return category.value === 1;
};

export const isPendingOrCompleted = (
  categoryId: number, 
  categories: Category[], 
  pendingCategories: Set<number>
): boolean => {
  const category = categories.find(c => c.id === categoryId);
  return pendingCategories.has(categoryId) || (category?.value === 1);
};

export const getCompletedCategories = (categories: Category[]): Category[] => {
  return categories.filter(isCategoryCompleted);
};

export const getAvailableCategories = (
  categories: Category[],
  canScoreCategory: (categoryId: number) => boolean
): Category[] => {
  return categories.filter(category => canScoreCategory(category.id));
};