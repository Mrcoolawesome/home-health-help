import { EnrichedProviderData } from "@/lib/types";

export default function NationalAvg({ data } : { data: EnrichedProviderData }) {
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
                <h3 className="font-medium">
                  {measure.measureName ?? measure.measureCode}
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    <span className="text-muted-foreground">Code:</span> {measure.measureCode}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Score:</span> {measure.score}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Date Range:</span> {measure.measureDateRange}
                  </p>
                  {measure.footnote && (
                    <p>
                      <span className="text-muted-foreground">Note:</span> {measure.footnote}
                    </p>
                  )}
                  {measure.nationalAverage && (
                    <p>
                      <span className="text-muted-foreground">National Avg:</span> {measure.nationalAverage}
                    </p>
                  )}
                  {measure.stateAverage && (
                    <p>
                      <span className="text-muted-foreground">State Avg:</span> {measure.stateAverage}
                    </p>
                  )}
                </div>
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