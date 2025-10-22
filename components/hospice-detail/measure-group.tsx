'use client';

import { MeasureBar } from './measure-bar';
import type { EnrichedProviderMeasure } from '@/lib/types';

interface MeasureGroupProps {
  title: string;
  measures: EnrichedProviderMeasure[];
  comparisonType?: 'state' | 'national';
}

export function MeasureGroup({
  title,
  measures,
  comparisonType = 'state',
}: MeasureGroupProps) {
  if (measures.length === 0) {
    return null;
  }

  const parseScore = (scoreStr: string): number => {
    const num = parseFloat(scoreStr);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-6">
        {measures.map((measure) => {
          const score = parseScore(measure.score);
          const comparisonScore =
            comparisonType === 'state'
              ? measure.stateAverage
                ? parseFloat(measure.stateAverage)
                : undefined
              : measure.nationalAverage
                ? parseFloat(measure.nationalAverage)
                : undefined;

          return (
            <MeasureBar
              key={measure.measureCode}
              measureName={measure.measureName || measure.measureCode}
              score={score}
              comparisonScore={comparisonScore}
              comparisonType={comparisonType}
              footnote={measure.footnote}
            />
          );
        })}
      </div>
    </div>
  );
}
