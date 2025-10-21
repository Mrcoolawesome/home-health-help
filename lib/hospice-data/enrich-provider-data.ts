import { 
  ProviderData, 
  EnrichedProviderData, 
  RawNationalDataRecord, 
  RawNationalCahpsRecord, 
  RawStateCahpsRecord 
} from "@/lib/types";

/**
 * Creates a lookup map for quick measure code lookups
 */
function createMeasureLookup(
  records: Array<{ "Measure Code": string; "Score": string }> | null
): Map<string, string> {
  const lookup = new Map<string, string>();
  if (!records) return lookup;
  
  records.forEach(record => {
    lookup.set(record["Measure Code"], record["Score"]);
  });
  
  return lookup;
}

/**
 * Enriches provider data with national and state averages
 * Single responsibility: Transform ProviderData into EnrichedProviderData
 */
export function enrichProviderData(
  providerData: ProviderData,
  nationalData: RawNationalDataRecord[] | null,
  nationalCahps: RawNationalCahpsRecord[] | null,
  stateCahps: RawStateCahpsRecord[] | null
): EnrichedProviderData {
  // Create lookup maps for O(1) access
  const nationalDataLookup = createMeasureLookup(nationalData);
  const nationalCahpsLookup = createMeasureLookup(nationalCahps);
  const stateCahpsLookup = createMeasureLookup(stateCahps);

  // Enrich each measure with comparison data
  const enrichedMeasures = providerData.measures.map(measure => ({
    ...measure,
    nationalAverage: nationalDataLookup.get(measure.measureCode) || 
                     nationalCahpsLookup.get(measure.measureCode),
    stateAverage: stateCahpsLookup.get(measure.measureCode)
  }));

  return {
    ...providerData,
    measures: enrichedMeasures
  };
}
