interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-lg font-medium text-white
        transition-all duration-200
        ${disabled 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      Submit Categories
    </button>
  );
}