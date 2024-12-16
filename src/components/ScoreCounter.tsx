import clsx from 'clsx';

interface ScoreCounterProps {
  score: number;
}

export default function ScoreCounter({ score }: ScoreCounterProps) {
  const maxScore = 100; // 10 events × 10 categories

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg px-6 py-3 flex items-center space-x-2 z-20">
      <span className="text-sm font-medium text-gray-600">Total Score:</span>
      <span className={clsx(
        "text-xl font-bold transition-colors duration-300",
        getScoreColor(score)
      )}>
        {score}
      </span>
      <span className="text-sm text-gray-500">/ {maxScore}</span>
    </div>
  );
}