import { TimelineEvent } from '../types';
import { TIME_FORMAT } from './constants';

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(TIME_FORMAT.SEPARATOR);
  const hour = parseInt(hours, 10);
  return `${hour % 12 || 12}${TIME_FORMAT.SEPARATOR}${minutes} ${hour < 12 ? 'AM' : 'PM'}`;
};

export const getEventProgress = (event: TimelineEvent): number => {
  const totalCategories = event.categories.length;
  if (totalCategories === 0) return 0;
  
  const completedCategories = event.categories.filter(cat => cat.value === 1).length;
  return (completedCategories / totalCategories) * 100;
};