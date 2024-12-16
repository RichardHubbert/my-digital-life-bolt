import { useState } from 'react';
import { TimelineEvent } from '../types';
import EventModal from './EventModal';
import TimelineItem from './TimelineItem';
import ScoreCounter from './ScoreCounter';
import { useTimelineData } from '../hooks/useTimelineData';
import LoadingSpinner from './LoadingSpinner';
import ResetButton from './ResetButton';
import CompleteSessionButton from './CompleteSessionButton';

interface TimelineProps {
  onComplete: () => Promise<void>;
}

export default function Timeline({ onComplete }: TimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const { events, loading, error, updateEvents, completeSession, resetEvents } = useTimelineData();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  const handleCategoryToggle = (eventId: number, categoryIds: number[]) => {
    const updatedEvents = events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          categories: event.categories.map(cat =>
            categoryIds.includes(cat.id) ? { ...cat, value: 1 } : cat
          )
        };
      }
      return event;
    });

    updateEvents(updatedEvents);
  };

  const handleCompleteSession = async () => {
    await completeSession();
    await onComplete();
  };

  const handleReset = () => {
    resetEvents();
  };

  const canScoreCategory = (eventId: number, categoryId: number): boolean => {
    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    const category = event.categories.find(c => c.id === categoryId);
    return category?.value === 0;
  };

  const totalScore = events.reduce((total, event) => 
    total + event.categories.reduce((eventTotal, cat) => 
      eventTotal + cat.value, 0
    ), 0
  );

  const isSessionComplete = events.every(event => 
    event.categories.some(cat => cat.value === 1)
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <CompleteSessionButton 
          onClick={handleCompleteSession}
          disabled={!isSessionComplete}
        />
        <ResetButton onReset={handleReset} />
      </div>

      <div className="p-4 sm:p-6">
        <div className="relative flex flex-col space-y-8">
          {events.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
              isFirst={index === 0}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onToggleCategory={handleCategoryToggle}
        canScoreCategory={canScoreCategory}
      />

      <ScoreCounter score={totalScore} />
    </div>
  );
}