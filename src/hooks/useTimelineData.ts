import { useState, useEffect, useCallback } from 'react';
import { TimelineEvent } from '../types';
import { timelineService } from '../services/timelineService';
import { events as initialEvents } from '../data/events';
import { useAuth } from './useAuth';

export function useTimelineData() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadTodayEvents = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const today = new Date();
      const savedEvents = await timelineService.getEvents(today);
      
      if (savedEvents.length === 0) {
        setEvents(initialEvents.map(event => ({
          ...event,
          categories: event.categories.map(cat => ({ ...cat, value: 0 }))
        })));
      } else {
        setEvents(savedEvents);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTodayEvents();
  }, [loadTodayEvents]);

  const updateEvents = (updatedEvents: TimelineEvent[]) => {
    setEvents(updatedEvents);
  };

  const completeSession = async () => {
    if (!user) return;

    try {
      setError(null);
      await timelineService.saveEvents(events, new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save events');
      console.error('Error saving events:', err);
      throw err;
    }
  };

  const resetEvents = () => {
    const resetData = initialEvents.map(event => ({
      ...event,
      categories: event.categories.map(cat => ({ ...cat, value: 0 }))
    }));
    setEvents(resetData);
  };

  return {
    events,
    loading,
    error,
    updateEvents,
    completeSession,
    resetEvents,
    refresh: loadTodayEvents
  };
}