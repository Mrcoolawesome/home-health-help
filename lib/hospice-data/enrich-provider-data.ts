import { 
  ProviderData, 
  EnrichedProviderData, 
  RawNationalDataRecord, 
  RawStateDataRecord 
} from "@/lib/types";

/**
 * Creates a lookup map for quick measure code lookups
 * Now handles case-insensitive matching
 */
function createMeasureLookup(
  records: Array<{ "Measure Code": string; "Score": string }> | null
): Map<string, string> {
  const lookup = new Map<string, string>();
  if (!records) return lookup;
  
  records.forEach(record => {
    // Store with uppercase key for case-insensitive matching
    const measureCode = record["Measure Code"]?.trim().toUpperCase();
    if (measureCode) {
      lookup.set(measureCode, record["Score"]);
    }
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
  stateData: RawStateDataRecord[] | null
): EnrichedProviderData {
  // Create lookup maps for O(1) access
  const nationalDataLookup = createMeasureLookup(nationalData);
  const stateDataLookup = createMeasureLookup(stateData);

  // Enrich each measure with comparison data
  const enrichedMeasures = providerData.measures.map(measure => ({
    ...measure,
    nationalAverage: nationalDataLookup.get(measure.measureCode),
    stateAverage: stateDataLookup.get(measure.measureCode)
  }));

  return {
    ...providerData,
    measures: enrichedMeasures
  };
}
