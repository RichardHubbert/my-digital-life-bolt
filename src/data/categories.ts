import { Category } from '../types';

export const defaultCategories: Category[] = [
  { id: 1, name: 'News', value: 0, color: 'bg-blue-500' },
  { id: 2, name: 'Weather', value: 0, color: 'bg-cyan-500' },
  { id: 3, name: 'Fitness', value: 0, color: 'bg-green-500' },
  { id: 4, name: 'Location', value: 0, color: 'bg-yellow-500' },
  { id: 5, name: 'Transport', value: 0, color: 'bg-red-500' },
  { id: 6, name: 'Work', value: 0, color: 'bg-purple-500' },
  { id: 7, name: 'Wifi', value: 0, color: 'bg-indigo-500' },
  { id: 8, name: 'Messaging', value: 0, color: 'bg-pink-500' },
  { id: 9, name: 'Gym', value: 0, color: 'bg-orange-500' },
  { id: 10, name: 'Satnav', value: 0, color: 'bg-teal-500' },
] as const;