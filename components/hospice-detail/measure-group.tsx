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
  const parseScore = (scoreStr: string): number => {
    const num = parseFloat(scoreStr);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      <div className="space-y-5">
        {measures.map((measure) => (
          <MeasureBar
            key={measure.measureCode}
            name={measure.measureName}
            score={parseScore(measure.score)}
            stateAverage={
              measure.stateAverage ? parseFloat(measure.stateAverage) : undefined
            }
            nationalAverage={
              measure.nationalAverage ? parseFloat(measure.nationalAverage) : undefined
            }
            comparisonType={comparisonType}
          />
        ))}
      </div>
    </div>
  );
}
