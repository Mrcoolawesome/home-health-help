import { ProviderData, RawCMSRecord } from "@/lib/types";

/**
 * Fetches raw provider data by CCN
 * Returns the raw CMS API response without transformation
 */
export async function getProviderData(ccn: string, footnote: boolean): Promise<RawCMSRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20098c6cc4-7426-5407-aae1-b361fc2072d6%5D%5BWHERE%20cms_certification_number_ccn%20%3D%20%22${ccn}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const rawData: RawCMSRecord[] = await response.json();

    if (!footnote) {
      return rawData.filter(record => !record["Footnote"] || record["Footnote"] === "");
    }

    return rawData;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch provider data:", error);
    return null;
  }
}

/**
 * Fetches raw provider CAHPS data by CCN
 * Returns the raw CMS API response without transformation
 */
export async function getProviderCahps(ccn: string, footnote: boolean): Promise<RawCMSRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20af93e008-23b4-563d-bacc-0be0708a8861%5D%5BWHERE%20cms_certification_number_ccn%20%3D%20%22${ccn}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const rawData: RawCMSRecord[] = await response.json();

    if (!footnote) {
      return rawData.filter(record => !record["Footnote"] || record["Footnote"] === "");
    }

    return rawData;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch provider data:", error);
    return null;
  }
}

/**
 * Combines raw provider data and CAHPS data into a single ProviderData object
 * Takes raw data from both sources and transforms into structured format
 */
export async function getCombinedProviderData(ccn: string, footnote: boolean): Promise<ProviderData | null> {
  try {
    // Fetch both datasets in parallel
    const [providerData, cahpsData] = await Promise.all([
      getProviderData(ccn, footnote),
      getProviderCahps(ccn, footnote)
    ]);

    // Need at least one dataset to have facility info
    if (!providerData || providerData.length === 0) {
      return null;
    }

    // Use the first record for facility info (all records have the same facility data)
    const firstRecord = providerData[0];

    // Combine measures from both datasets
    const allMeasures = [
      ...(providerData || []).map(record => ({
        measureCode: record["Measure Code"],
        measureName: record["Measure Name"],
        score: record["Score"],
        starRating: record["Star Rating"],
        footnote: record["Footnote"],
        measureDateRange: record["Measure Date Range"]
      })),
      ...(cahpsData || []).map(record => ({
        measureCode: record["Measure Code"],
        measureName: record["Measure Name"],
        score: record["Score"],
        starRating: record["Star Rating"],
        footnote: record["Footnote"],
        measureDateRange: record["Measure Date Range"]
      }))
    ];

    return {
      ccn: firstRecord["CMS Certification Number (CCN)"],
      facilityName: firstRecord["Facility Name"],
      addressLine1: firstRecord["Address Line 1"],
      addressLine2: firstRecord["Address Line 2"],
      city: firstRecord["City/Town"],
      state: firstRecord["State"],
      zipCode: firstRecord["ZIP Code"],
      county: firstRecord["County/Parish"],
      phone: firstRecord["Telephone Number"],
      cmsRegion: firstRecord["CMS Region"],
      measures: allMeasures
    };

  } catch (error) {
    console.error("Failed to fetch combined provider data:", error);
    return null;
  }
}