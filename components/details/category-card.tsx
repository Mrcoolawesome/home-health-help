import { EnrichedProviderMeasure } from "@/lib/types";
import Statistic from "../display-data/statistic";

interface CategoryCardProps {
  title: string,
  measures: EnrichedProviderMeasure[],
  compare?: "stateAverage" | "nationalAverage"
}

export default function CategoryCard({ title, measures, compare } : CategoryCardProps){
  return (
    <div className="bg-background border-2 border-foreground-alt rounded-2xl text-forground p-4">
      <h1 className="font-bold text-lg mb-2">{title}</h1>
      {measures.map((measure, index) => (
        <article
          key={index}
          className="mb-2"
        >
          <Statistic measure={ measure } compare={compare}/>
        </article>
      ))}
    </div>
  )
}