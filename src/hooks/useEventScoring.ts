import { useState, useCallback, useMemo } from 'react';
import { TimelineEvent } from '../types';

export function useEventScoring(initialEvents: readonly TimelineEvent[]) {
  const [events, setEvents] = useState<TimelineEvent[]>(() => 
    initialEvents.map(event => ({
      ...event,
      categories: event.categories.map(cat => ({ ...cat, value: 0 }))
    }))
  );

  const canScoreCategory = useCallback((eventId: number, categoryId: number): boolean => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    const category = event.categories.find(c => c.id === categoryId);
    return category?.value === 0;
  }, [events]);

  const toggleCategory = useCallback((eventId: number, categoryId: number) => {
    if (!canScoreCategory(eventId, categoryId)) return;
    
    setEvents(prevEvents => 
      prevEvents.map(event => {
        if (event.id === eventId) {
          return {
            ...event,
            categories: event.categories.map(cat => 
              cat.id === categoryId ? { ...cat, value: 1 } : cat
            )
          };
        }
        return event;
      })
    );
  }, [canScoreCategory]);

  const totalScore = useMemo(() => 
    events.reduce((total, event) => 
      total + event.categories.reduce((eventTotal, cat) => 
        eventTotal + cat.value, 0
      ), 0
    ), [events]
  );

  return {
    events,
    toggleCategory,
    canScoreCategory,
    totalScore,
  };
}