import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";

export default async function NameColumn() {
  const measures = await getEnrichedProviderData("461553");

  measures?.measures.sort((a, b) => {
    return a.measureCode.localeCompare(b.measureCode);
  })

  return (
    <div className="min-w-[200px] flex flex-col flex-shrink-0 sticky left-0 z-10 bg-background">
      <div className="h-[84px]">
      </div>
      {
        measures?.measures.map((measure) => (
          <div key={measure.measureCode} className="w-full border border-foreground p-1 max-w-[400px] h-[60px]">
            {measure.real_desc}
          </div>
        ))
      }
    </div >
  )
}
