import { ResetButton } from '../common/ResetButton';

interface TimelineHeaderProps {
  onReset: () => void;
}

export default function TimelineHeader({ onReset }: TimelineHeaderProps) {
  return (
    <div className="flex justify-end mb-4">
      <ResetButton onReset={onReset} />
    </div>
  );
}