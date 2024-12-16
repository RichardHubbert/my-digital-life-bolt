import { Timestamp } from 'firebase/firestore';

export interface TimelineEventData {
  id: number;
  time: string;
  title: string;
  description: string;
  categories: CategoryData[];
  date: string;
}

export interface CategoryData {
  id: number;
  name: string;
  value: number;
  color: string;
}

export interface UsageData {
  date: string;
  events: TimelineEventData[];
  timestamp: Timestamp;
}

export interface FirebaseError {
  code: string;
  message: string;
}