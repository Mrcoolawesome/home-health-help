import { 
  ProviderData, 
  EnrichedProviderData, 
  RawNationalDataRecord, 
  RawStateDataRecord, 
  RawNationalCahpsRecord,
  Code
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
 * Creates a lookup map for Code objects by measure code
 */
function createCodeLookup(
  codes: Code[] | null
): Map<string, Code> {
  const lookup = new Map<string, Code>();
  if (!codes) return lookup;
  
  codes.forEach(code => {
    // Store with uppercase key for case-insensitive matching
    const measureCode = code.measure_code?.trim().toUpperCase();
    if (measureCode) {
      lookup.set(measureCode, code);
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
  nationalCahps: RawNationalCahpsRecord[] | null,
  stateData: RawStateDataRecord[] | null,
  stateCahps: RawStateDataRecord[] | null,
  customData: Code[] | null,
): EnrichedProviderData {
  // Create lookup maps for O(1) access
  const nationalDataLookup = createMeasureLookup(nationalData);
  const nationalCahpsLookup = createMeasureLookup(nationalCahps);
  const stateDataLookup = createMeasureLookup(stateData);
  const stateCahpsLookup = createMeasureLookup(stateCahps);
  const codeLookup = createCodeLookup(customData);

  // Enrich each measure with comparison data
  // Use uppercase for case-insensitive matching
  const enrichedMeasures = providerData.measures.map(measure => {
    const measureCodeUpper = measure.measureCode.trim().toUpperCase();
    const codeData = codeLookup.get(measureCodeUpper);
    
    return {
      ...measure,
      nationalAverage: nationalDataLookup.get(measureCodeUpper) || nationalCahpsLookup.get(measureCodeUpper),
      stateAverage: stateDataLookup.get(measureCodeUpper) || stateCahpsLookup.get(measureCodeUpper),
      // Add fields from Code type
      real_desc: codeData?.real_desc,
      opt_sorting: codeData?.opt_sorting,
      family_caregiver_experience: codeData?.family_caregiver_experience,
      quality_patient_care: codeData?.quality_patient_care,
      conditions_treated: codeData?.conditions_treated,
      location_of_care: codeData?.location_of_care,
      out_of: codeData?.out_of,
      lower_is_better: codeData?.lower_is_better,
    };
  });

  return {
    ...providerData,  
    measures: enrichedMeasures
  };
}
