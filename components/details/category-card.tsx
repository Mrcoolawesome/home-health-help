import { EnrichedProviderMeasure } from "@/lib/types";
import Statistic from "./statistic";

export default function CategoryCard({ title, measures } : {title: string; measures: EnrichedProviderMeasure[] }){
  return (
    <div>
      <h1>{title}</h1>
      {measures.map((measure, index) => (
        <article
          key={index}
        >
          <Statistic measure={ measure }/>
        </article>
      ))}
    </div>
  )
}