import { TimelineEvent } from '../types';
import { defaultCategories } from './categories';

export const events: TimelineEvent[] = [
  {
    id: 1,
    time: '07:00',
    title: 'Morning Routine',
    description: 'Start your day with news and weather check',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 2,
    time: '09:00',
    title: 'Commute to Work',
    description: 'Check transport and navigation',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 3,
    time: '11:00',
    title: 'Work Session',
    description: 'Connect to wifi and start working',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 4,
    time: '13:00',
    title: 'Lunch Break',
    description: 'Check messages and location for lunch',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 5,
    time: '14:30',
    title: 'Afternoon Tasks',
    description: 'Stay connected and productive',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 6,
    time: '16:00',
    title: 'Fitness Time',
    description: 'Track your fitness goals',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 7,
    time: '17:30',
    title: 'Gym Session',
    description: 'Navigate to gym and workout',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 8,
    time: '19:00',
    title: 'Evening Update',
    description: 'Check news and weather for tomorrow',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 9,
    time: '20:30',
    title: 'Planning',
    description: 'Review messages and tomorrow\'s route',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
  {
    id: 10,
    time: '22:00',
    title: 'Day End',
    description: 'Final check of all digital activities',
    categories: defaultCategories.map(cat => ({ ...cat, value: 0 })),
  },
] as const;