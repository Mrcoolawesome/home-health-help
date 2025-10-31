import { EnrichedProviderData } from "@/lib/types";
import { getCombinedProviderData } from "./provider-data";
import { getNationalCahps, getNationalData } from "./national-data";
import { getStateCahps, getStateData } from "./state-data";
import { enrichProviderData } from "./enrich-provider-data";
import { getAllCodes } from "../get-code-details";

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

    // Fetch comparison data in parallel for better performance
    const [nationalData, nationalCahps, stateData, stateCahps, customData] = await Promise.all([
      getNationalData(),
      getNationalCahps(),
      getStateData(providerData.state.toUpperCase()),
      getStateCahps(providerData.state.toUpperCase()),
      getAllCodes(),
    ]);

    // Enrich the provider data with comparison averages
    return enrichProviderData(providerData, nationalData, nationalCahps, stateData, stateCahps, customData);

  } catch (error) {
    console.error("Failed to fetch enriched provider data:", error);
    return null;
  }
}
