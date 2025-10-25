import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";
import type { EnrichedProviderData } from "@/lib/types";
import Overview from "./overview";
import StateAvg from "./stateAvg";
import NationalAvg from "./nationalAvg";
import { Tabs } from "@base-ui-components/react";

export const familyCaregiverExperience: string[] = [
  "TEAM_COMM_TBV",
  "TIMELY_CARE_TBV",
  "RESPECT_TBV",
  "EMO_REL_TBV",
  "SYMPTOMS_TBV",
  "TRAINING_TBV",
  "RATING_TBV",
  "RECOMMEND_TBV",
]

export const qualityPatientCare: string[] = [
  "H_008_01_OBSERVED",
  "H_011_01_OBSERVED",
  "H_012_00_OBSERVED",
]

export const conditionsTreated: string[] = [
  "Pct_Pts_w_Cancer",
  "Pct_Pts_w_Dementia",
  "Pct_Pts_w_Stroke",
  "Pct_Pts_w_Circ_Heart_Disease",
  "Pct_Pts_w_Resp_Disease",
  "Pct_Pts_w_other_conditions",
]

export const locationCare: string[] = [
  "Care_Provided_Home",
  "Care_Provided_Assisted_Living",
  "Care_Provided_Nursing_Facility",
  "Care_Provided_Skilled_Nursing",
  "Care_Provided_Inpatient_Hospital",
  "Care_Provided_Inpatient_Hospice",
  "Care_Provided_other_locations",
]

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

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">

      {/* Provider Header */}
      <header className="pb-6">
        <h1 className="text-3xl font-bold tracking-tight">{data.facilityName}</h1>
      </header>

      {/* Contact Information Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <div className="space-y-1 text-sm mb-2">
          <p>{data.addressLine1}</p>
          {data.addressLine2 && <p>{data.addressLine2}</p>}
          <p>
            {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Phone:</span> {data.phone}
          </p>
        </div>
      </section>

      <Tabs.Root className="w-full mx-auto py-4" defaultValue="overview">
        <Tabs.List className="sticky top-[65px] flex items-center bg-gray-400 text-black z-0 p-1 h-[40px] rounded-full">
          <Tabs.Tab
            className="flex-1 z-[2] h-full" 
            value="overview"
          >
            Overview
          </Tabs.Tab>
          <Tabs.Tab 
            className="flex-1 z-[2] h-full"
            value="stateAvg"
          >
            State Avg
          </Tabs.Tab>
          <Tabs.Tab 
            className="flex-1 z-[2] h-full"
            value="nationalAvg"
          >
            National Avg
          </Tabs.Tab>
          <Tabs.Indicator className="rounded-full z-[1] absolute left-[var(--active-tab-left)] bg-white w-[var(--active-tab-width)] h-[var(--active-tab-height)] transition-all"/>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <Overview data= { data }/>
        </Tabs.Panel>
        <Tabs.Panel value="stateAvg">
          <StateAvg data= { data }/>
        </Tabs.Panel>
        <Tabs.Panel value="nationalAvg">
          <NationalAvg data= { data }/>
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  )
}
