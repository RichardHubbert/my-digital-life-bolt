import { TimelineEvent, Category } from '../types';

export const calculateEventScore = (categories: Category[]): number => {
  return categories.reduce((total, cat) => total + cat.value, 0);
};

export const calculateTotalScore = (events: TimelineEvent[]): number => {
  return events.reduce((total, event) => 
    total + calculateEventScore(event.categories), 0
  );
};

export const calculateTotalCompletedCategories = (events: TimelineEvent[]): number => {
  const completedCategories = new Set();
  
  events.forEach(event => {
    event.categories.forEach(category => {
      if (category.value === 1) {
        completedCategories.add(`${event.id}-${category.id}`);
      }
    });
  });

  return completedCategories.size;
};

export const getScoreColor = (score: number): string => {
  if (score < 30) return 'text-green-600';
  if (score < 60) return 'text-yellow-600';
  return 'text-red-600';
};