import { useState, useEffect, useCallback } from 'react';
import { timelineService } from '../services/timelineService';

export function useUsageDates() {
  const [usageDates, setUsageDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsageDates();
  }, []);

  const loadUsageDates = async () => {
    try {
      setLoading(true);
      const dates = await timelineService.getUsageDates();
      setUsageDates(dates);
    } catch (error) {
      console.error('Failed to load usage dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUsageDate = useCallback(async (date: Date) => {
    const dateStr = date.toDateString();
    const exists = usageDates.some(d => d.toDateString() === dateStr);
    if (!exists) {
      setUsageDates(prev => [...prev, date]);
    }
  }, [usageDates]);

  return {
    usageDates,
    loading,
    addUsageDate
  };
}