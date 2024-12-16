import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  };
}