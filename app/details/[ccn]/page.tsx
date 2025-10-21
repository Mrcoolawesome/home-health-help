import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";
import type { EnrichedProviderData } from "@/lib/types";

interface DetailPageProps {
  params: {
    ccn: string;
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { ccn } = await params;
  const data: EnrichedProviderData | null = await getEnrichedProviderData(ccn);
  
  if (!data) {
    return <div>Failed to load provider data</div>;
  }

  return (
    <div>
      {/* Provider Header */}
      <header>
        <h1>{data.facilityName}</h1>
        <p>CCN: {data.ccn}</p>
      </header>

      {/* Contact Information Section */}
      <section>
        <h2>Contact Information</h2>
        <div>
          <p>Phone: {data.phone}</p>
        </div>
      </section>

      {/* Address Section */}
      <section>
        <h2>Address</h2>
        <div>
          <p>{data.addressLine1}</p>
          {data.addressLine2 && <p>{data.addressLine2}</p>}
          <p>{data.city}, {data.state} {data.zipCode}</p>
          <p>County: {data.county}</p>
        </div>
      </section>

      {/* Administrative Information */}
      <section>
        <h2>Administrative Information</h2>
        <div>
          <p>CMS Region: {data.cmsRegion}</p>
        </div>
      </section>

      {/* Quality Measures Section */}
      <section>
        <h2>Quality Measures</h2>
        {data.measures.length > 0 ? (
          <div>
            {data.measures.map((measure, index) => (
              <article key={index}>
                <h3>{measure.measureName}</h3>
                <div>
                  <p>Code: {measure.measureCode}</p>
                  <p>Score: {measure.score}</p>
                  <p>Date Range: {measure.measureDateRange}</p>
                  {measure.footnote && <p>Note: {measure.footnote}</p>}
                  {measure.stateAverage && <p>State Avg: {measure.stateAverage}</p>}
                  {measure.nationalAverage && <p>National Avg: {measure.nationalAverage}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No quality measures available</p>
        )}
      </section>
    </div>
  )
}
