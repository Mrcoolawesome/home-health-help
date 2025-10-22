import { EnrichedProviderData } from "@/lib/types";
import { getProviderData } from "./provider-data";
import { getNationalData } from "./national-data";
import { getStateData } from "./state-data";
import { enrichProviderData } from "./enrich-provider-data";

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
    const providerData = await getProviderData(ccn);
    
    if (!providerData) {
      return null;
    }

    // Fetch comparison data in parallel for better performance
    const [nationalData, stateData] = await Promise.all([
      getNationalData(),
      getStateData(providerData.state.toUpperCase())
    ]);

    // Enrich the provider data with comparison averages
    return enrichProviderData(providerData, nationalData, stateData);

  } catch (error) {
    console.error("Failed to fetch enriched provider data:", error);
    return null;
  }
}
