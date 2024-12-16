import { useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface CompleteSessionButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
}

export default function CompleteSessionButton({ onClick, disabled }: CompleteSessionButtonProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleClick = async () => {
    setIsSaving(true);
    try {
      await onClick();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isSaving}
      className={clsx(
        "flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
        disabled || isSaving
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-green-600 text-white hover:bg-green-700"
      )}
    >
      {isSaving ? (
        <>
          <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-gray-600 rounded-full" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>Complete Session</span>
        </>
      )}
    </button>
  );
}