import { EnrichedProviderMeasure } from "@/lib/types";
import Statistic from "./statistic";

interface CategoryCardProps {
  title: string,
  measures: EnrichedProviderMeasure[],
  compare?: "stateAverage" | "nationalAverage"
}

export default function CategoryCard({ title, measures, compare } : CategoryCardProps){
  return (
    <div className="bg-white border-2 border-gray-300 rounded-2xl text-black p-4">
      <h1>{title}</h1>
      {measures.map((measure, index) => (
        <article
          key={index}
        >
          <Statistic measure={ measure } compare={compare}/>
        </article>
      ))}
    </div>
  )
}