import { EnrichedProviderMeasure } from "@/lib/types";

export default function Statistic({ measure } : { measure: EnrichedProviderMeasure }) {
  // Parse the score to get percentage value
  const percentage = parseFloat(measure.score);
  
  return (
    <div className="space-y-2">
      {/* Header with info icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-black">
          {measure.measureName}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-black">
            {measure.score}%
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}