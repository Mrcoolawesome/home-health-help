'use client';

interface MeasureBarProps {
  name: string;
  score: number;
  stateAverage?: number;
  nationalAverage?: number;
  comparisonType?: 'state' | 'national';
  footnote?: string;
}

export function MeasureBar({
  name,
  score,
  stateAverage,
  nationalAverage,
  comparisonType = 'state',
  footnote,
}: MeasureBarProps) {
  const comparison = comparisonType === 'state' ? stateAverage : nationalAverage;

  // Determine bar color based on score vs comparison
  const getBarColor = (): string => {
    if (!comparison) return 'bg-green-500';
    if (score > comparison) return 'bg-green-500';
    if (Math.abs(score - comparison) < 1) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getStatusText = (): string => {
    if (!comparison) return '';
    if (score > comparison) return '↑';
    if (Math.abs(score - comparison) < 1) return '=';
    return '↓';
  };

  // Normalize score for display (assuming 0-100 scale)
  const displayScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="space-y-2 pb-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800">{name}</div>
          {footnote && <div className="text-xs text-gray-500 mt-1">{footnote}</div>}
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {score.toFixed(1)}%
          </span>
          {comparison && (
            <span
              className={`text-lg font-semibold ${
                score > comparison
                  ? 'text-green-600'
                  : Math.abs(score - comparison) < 1
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {getStatusText()}
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all duration-300`}
          style={{ width: `${displayScore}%` }}
        />
      </div>
    </div>
  );
}
