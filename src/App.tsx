import { useState } from 'react';
import Timeline from './components/Timeline';
import CalendarView from './components/CalendarView';
import AuthForm from './components/auth/AuthForm';
import UserMenu from './components/auth/UserMenu';
import { useUsageDates } from './hooks/useUsageDates';
import { useAuth } from './hooks/useAuth';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { usageDates, addUsageDate } = useUsageDates();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Digital Life Timeline</h1>
            <p className="mt-2 text-lg text-gray-600">Track your daily activities and metrics</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsCalendarOpen(true)}
              className="p-2 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors"
              title="View Calendar"
            >
              <CalendarIcon className="h-6 w-6 text-gray-600" />
            </button>
            <UserMenu />
          </div>
        </div>
        <Timeline onComplete={() => addUsageDate(new Date())} />
      </div>

      <CalendarView
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        usageDates={usageDates}
      />
    </div>
  );
}