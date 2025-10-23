import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";
import type { EnrichedProviderData } from "@/lib/types";
import Overview from "./overview";
import { Tabs } from "@/components/ui/tabs";
import StateAvg from "./stateAvg";
import NationalAvg from "./nationalAvg";
import Statistic from "@/components/details/statistic";

interface DetailPageProps {
  params: {
    ccn: string;
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { ccn } = await params;
  const data: EnrichedProviderData | null = await getEnrichedProviderData(ccn);
  
  if (!data) {
    return <div className="container mx-auto max-w-4xl px-4 py-8">Failed to load provider data</div>;
  }

  const tabs = [
    {
      name: "Overview",
      content: <Overview data= { data }/>
    },
    {
      name: "State Average",
      content: <StateAvg data= { data }/>
    },
    {
      name: "National Average",
      content: <NationalAvg data= { data }/>
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">

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

      <Tabs tabs={tabs} defaultTab={0} />
    </div>
  )
}
