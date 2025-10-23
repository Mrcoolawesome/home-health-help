import { EnrichedProviderMeasure } from "@/lib/types";
import Statistic from "./statistic";

export default function CategoryCard({ title, measures } : {title: string; measures: EnrichedProviderMeasure[] }){
  return (
    <div className="bg-white border-2 border-gray-300 rounded-2xl text-black p-4">
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