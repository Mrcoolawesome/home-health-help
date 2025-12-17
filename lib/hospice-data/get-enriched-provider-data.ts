import { EnrichedProviderData, RawStateDataRecord } from "@/lib/types";
import { getCombinedProviderData } from "./provider-data";
import { enrichProviderData } from "./enrich-provider-data";
import { getAllCodes } from "./get-code-details";
import { RawNationalDataRecord } from "@/lib/types";
import { RawNationalCahpsRecord } from "@/lib/types";
import { NATIONAL_CAHPS_DATA, NATIONAL_DATA, STATE_CAHPS_DATA, STATE_DATA } from "../globals";
import { GetCmsData } from "./get-cms-data";

/**
 * Fetches provider data along with national and state comparison data
 * Single responsibility: Orchestrate multiple data fetches and enrichment
 * 
 * This is the high-level function to use when you need provider data
 * with national and state averages for comparison.
 * 
 * @param ccn - The CMS Certification Number for the provider
 * @returns EnrichedProviderData with measures including national/state averages
 */
export async function getEnrichedProviderData(ccn: string): Promise<EnrichedProviderData | null> {
  try {
    // Fetch provider data first to get the state
    const providerData = await getCombinedProviderData(ccn);

    if (!providerData) {
      return null;
    }

    const rawNationalData: RawNationalDataRecord[] = await GetCmsData(`[SELECT * FROM ${NATIONAL_DATA}]`);
    const rawNationalCahps: RawNationalCahpsRecord[] = await GetCmsData(`[SELECT * FROM ${NATIONAL_CAHPS_DATA}]`);
    const rawStateData: RawStateDataRecord[] = await GetCmsData(`[SELECT * FROM ${STATE_DATA}][WHERE state = "${providerData.state.toUpperCase()}"]`);
    const rawStateCahps: RawStateDataRecord[] = await GetCmsData(`[SELECT * FROM ${STATE_CAHPS_DATA}][WHERE state = "${providerData.state.toUpperCase()}"]`);

    // Fetch comparison data in parallel for better performance
    const [nationalData, nationalCahps, stateData, stateCahps, customData] = await Promise.all([
      rawNationalData,
      rawNationalCahps,
      rawStateData,
      rawStateCahps,
      getAllCodes(),
    ]);

    // Enrich the provider data with comparison averages
    return enrichProviderData(providerData, nationalData, nationalCahps, stateData, stateCahps, customData);

  } catch (error) {
    console.error("Failed to fetch enriched provider data:", error);
    return null;
  }
}
