'use client';

interface MeasureBarProps {
  name: string;
  score: number;
  stateAverage?: number;
  nationalAverage?: number;
  comparisonType?: 'state' | 'national';
}

export function MeasureBar({
  name,
  score,
  stateAverage,
  nationalAverage,
  comparisonType = 'state',
}: MeasureBarProps) {
  const comparison = comparisonType === 'state' ? stateAverage : nationalAverage;

  // Determine bar color based on score vs comparison
  const getBarColor = (): string => {
    if (!comparison) return 'bg-green-500';
    if (score > comparison) return 'bg-green-500';
    if (score === comparison) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  // Normalize score for display (assuming 0-100 scale)
  const displayScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-gray-600 font-semibold">{score.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all`}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
}
