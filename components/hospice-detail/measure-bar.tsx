'use client';

interface MeasureBarProps {
  measureName: string;
  score: number;
  comparisonScore?: number;
  comparisonType?: 'state' | 'national';
  footnote?: string;
}

export function MeasureBar({
  measureName,
  score,
  comparisonScore,
  comparisonType = 'state',
  footnote,
}: MeasureBarProps) {
  // Determine bar color based on score vs comparison
  const getBarColor = (): string => {
    if (!comparisonScore) return 'bg-green-500';
    if (score > comparisonScore) return 'bg-green-500';
    if (Math.abs(score - comparisonScore) < 1) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  const getStatusIcon = (): string => {
    if (!comparisonScore) return '';
    if (score > comparisonScore) return '↑';
    if (Math.abs(score - comparisonScore) < 1) return '=';
    return '↓';
  };

  // Normalize score for display (assuming 0-100 scale)
  const displayScore = Math.min(Math.max(score, 0), 100);

  return (
    <div className="space-y-2 pb-3">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-800 break-words">{measureName}</div>
          {footnote && (
            <div className="text-xs text-gray-500 mt-1 break-words">{footnote}</div>
          )}
        </div>
        <div className="flex items-center gap-3 ml-2 flex-shrink-0">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
            {score.toFixed(1)}%
          </span>
          {comparisonScore !== undefined && (
            <span
              className={`text-lg font-semibold w-6 text-center ${
                score > comparisonScore
                  ? 'text-green-600'
                  : Math.abs(score - comparisonScore) < 1
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }`}
            >
              {getStatusIcon()}
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
