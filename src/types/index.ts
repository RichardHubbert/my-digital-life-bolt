export interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  value: number;
  color: string;
}