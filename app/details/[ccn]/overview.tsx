import Statistic from "@/components/details/statistic";
import { EnrichedProviderData } from "@/lib/types";

export default function Overview({ data } : { data: EnrichedProviderData }) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      
      {/* Quality Measures Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-4">Quality Measures</h2>
        {data.measures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {data.measures.map((measure, index) => (
              <article
                key={index}
                className="rounded-lg border p-4 hover:shadow-sm transition-shadow"
              >
                <Statistic measure={ measure }/>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No quality measures available</p>
        )}
      </section>
    </div>
  )
}