import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";
import type { EnrichedProviderData } from "@/lib/types";

interface DetailPageProps {
  params: {
    ccn: string;
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { ccn } = params;
  const data: EnrichedProviderData | null = await getEnrichedProviderData(ccn);
  
  if (!data) {
    return <div className="container mx-auto max-w-4xl px-4 py-8">Failed to load provider data</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      {/* Provider Header */}
      <header className="border-b pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{data.facilityName}</h1>
        <p className="text-sm text-muted-foreground mt-1">CCN: {data.ccn}</p>
      </header>

      {/* Contact Information Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Phone:</span> {data.phone}
          </p>
        </div>
      </section>

      {/* Address Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <div className="space-y-1 text-sm">
          <p>{data.addressLine1}</p>
          {data.addressLine2 && <p>{data.addressLine2}</p>}
          <p>
            {data.city}, {data.state} {data.zipCode}
          </p>
          <p className="text-muted-foreground">County: {data.county}</p>
        </div>
      </section>

      {/* Administrative Information */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-2">Administrative Information</h2>
        <div className="text-sm">
          <p>
            <span className="text-muted-foreground">CMS Region:</span> {data.cmsRegion}
          </p>
        </div>
      </section>

      {/* Quality Measures Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-4">Quality Measures</h2>
        {data.measures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {data.measures.map((measure, index) => (
              <article
                key={`${measure.measureCode}-${measure.measureDateRange}-${index}`}
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
                  {measure.stateAverage && (
                    <p>
                      <span className="text-muted-foreground">State Avg:</span> {measure.stateAverage}
                    </p>
                  )}
                  {measure.nationalAverage && (
                    <p>
                      <span className="text-muted-foreground">National Avg:</span> {measure.nationalAverage}
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
