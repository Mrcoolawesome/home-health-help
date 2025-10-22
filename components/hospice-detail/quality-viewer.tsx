'use client';

import { useState } from 'react';
import { MeasureGroup } from './measure-group';
import { categorizeMeasures } from '@/lib/hospice-data/categorize-measures';
import type { EnrichedProviderData } from '@/lib/types';

interface QualityViewerProps {
  data: EnrichedProviderData;
}

type ComparisonType = 'overview' | 'state' | 'national';

export function QualityViewer({ data }: QualityViewerProps) {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('overview');
  const categorized = categorizeMeasures(data.measures);

  const parseScore = (scoreStr: string): number => {
    const num = parseFloat(scoreStr);
    return isNaN(num) ? 0 : num;
  };

  // Calculate summaries
  const calculateStateAverage = () => {
    const stateScores = data.measures
      .filter((m) => m.stateAverage)
      .map((m) => parseFloat(m.stateAverage!));
    if (stateScores.length === 0) return 0;
    return stateScores.reduce((a, b) => a + b, 0) / stateScores.length;
  };

  const calculateNationalAverage = () => {
    const nationalScores = data.measures
      .filter((m) => m.nationalAverage)
      .map((m) => parseFloat(m.nationalAverage!));
    if (nationalScores.length === 0) return 0;
    return nationalScores.reduce((a, b) => a + b, 0) / nationalScores.length;
  };

  const calculateFacilityAverage = () => {
    const facilityScores = data.measures.map((m) => parseScore(m.score));
    if (facilityScores.length === 0) return 0;
    return facilityScores.reduce((a, b) => a + b, 0) / facilityScores.length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{data.facilityName}</h1>
          <p className="text-sm text-gray-600 mt-1">CCN: {data.ccn}</p>
          <p className="text-sm text-gray-600">
            {data.addressLine1}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
      </div>

      {/* Subtitle */}
      <div className="bg-gray-100 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm text-gray-700">
            Interactive visualization of hospice quality metrics and performance indicators
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setComparisonType('overview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                comparisonType === 'overview'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setComparisonType('state')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                comparisonType === 'state'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              vs State Avg
            </button>
            <button
              onClick={() => setComparisonType('national')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                comparisonType === 'national'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              vs National Avg
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Comparison Info with Legend */}
        <div className="bg-gray-100 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700 mb-4">
            {comparisonType === 'overview' && (
              'Color-coded comparison showing this hospice performs relative to quality benchmarks.'
            )}
            {comparisonType === 'state' && (
              'Color-coded comparison showing this hospice performs relative to state benchmarks.'
            )}
            {comparisonType === 'national' && (
              'Color-coded comparison showing this hospice performs relative to national benchmarks.'
            )}
          </p>
          {comparisonType !== 'overview' && (
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-gray-700">
                  {comparisonType === 'state' ? 'Above State Avg' : 'Above National Avg'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                <span className="text-gray-700">
                  {comparisonType === 'state' ? 'State Avg' : 'National Avg'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full" />
                <span className="text-gray-700">
                  {comparisonType === 'state' ? 'Below State Avg' : 'Below National Avg'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Measure Groups */}
        <div className="space-y-8">
          {Object.entries(categorized).map(([category, measures]) =>
            measures.length > 0 ? (
              <MeasureGroup
                key={category}
                title={category}
                measures={measures}
                comparisonType={
                  comparisonType === 'overview' ? 'state' : comparisonType
                }
              />
            ) : null
          )}
        </div>

        {/* Summary Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Performance Summary{' '}
            {comparisonType === 'state' && 'by State'}
            {comparisonType === 'national' && 'by National'}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {comparisonType === 'state' ? 'State Avg' : 'National Avg'}
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {comparisonType === 'state'
                  ? calculateStateAverage().toFixed(1)
                  : calculateNationalAverage().toFixed(1)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Facility Avg</p>
              <p className="text-3xl font-bold text-gray-900">
                {calculateFacilityAverage().toFixed(1)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Difference</p>
              <p className="text-3xl font-bold text-gray-900">
                {(
                  calculateFacilityAverage() -
                  (comparisonType === 'state'
                    ? calculateStateAverage()
                    : calculateNationalAverage())
                ).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
