import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface ResetButtonProps {
  onReset: () => void;
}

export default function ResetButton({ onReset }: ResetButtonProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmReset = () => {
    onReset();
    setShowConfirmation(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-200"
      >
        <ArrowPathIcon className="h-4 w-4" />
        <span>Reset Session</span>
      </button>

      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
              Reset Session Data
            </Dialog.Title>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to reset all data for the current session? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}